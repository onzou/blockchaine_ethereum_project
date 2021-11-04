import './App.css';
import { Component } from 'react';
import web3 from './web3';
import donation  from './donation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from "react-bootstrap";
import Header from './header/header';

toast.configure();

class App extends Component 
{

  state = {
    organizationLength: "",
    value: "",
    organizationName: "",
    organizationResidency: "",
    organizationDescription: "",
    isOpen: false,
    organizations: [],
    isLoading: true,
    currentOrganization: {},
    isDonationOpened: false
  };

  
  openModal(currentOrganization)
  { 
    console.log(currentOrganization);
    this.setState({isOpen: true});  
    this.setState({currentOrganization})
  };

  closeModal = () => { this.setState({isOpen: false}) };

  
  gettingAllOrganizations = async ()=>
  {
    let organizations = []; 
    for(let i = 0; i < this.state.organizationLength; i++)
    {
      const singleOrganization = await donation.methods.getOrganization(i).call();
      organizations.push(
      {
        address: singleOrganization[0],
        name: singleOrganization[1],
        description: singleOrganization[2],
        residence: singleOrganization[3],
        amount: singleOrganization[4]
      });
    } 
    this.setState({organizations});
  }
  
  componentDidMount = async ()=>
  {
    const organizationLength = await donation.methods.getOrganizationLength().call();

    this.setState({organizationLength});

    this.gettingAllOrganizations();

    this.setState({isLoading: false});

  }

  onCreateOrganization = async event =>
  {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();
    toast.promise( async ()=>
    {
      await donation.methods.createOrganization(this.state.organizationName,this.state.organizationDescription, this.state.organizationResidency)
                            .send(
                            {
                              from: accounts[0], 
                            });
    },
    {
      pending: "Chargement...",
      success: "Création réussie",
      error: "Erreur lors de la création"
    });
  }

  openDonation = () => { this.setState({isDonationOpened: true}) };

  onDonate = async () =>
  {
    this.setState({isOpen: false});
    if(!this.state.currentOrganization.address || Number(this.state.value) <= 0)
    {
      return null;
    }
    this.setState({message: "Chargement...."})
    const accounts = await web3.eth.getAccounts();
    toast.promise( async ()=>
    {
      await donation.methods.donate(this.state.currentOrganization.address)
                    .send(
                    {
                      from: accounts[0],
                      value: web3.utils.toWei(this.state.value, "ether")
                    });
    },
    {
      pending: "Chargement...",
      success: "Donation réussie",
      error: "Erreur lors de la donation"
    });
  }

  render() 
  {
    return (
      
      <div className="container">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>
      <Header>
        
      </Header>
      {
        this.isLoading? <p>Chargement...</p> : 
        <div className="container">
          <p>il y a {this.state.organizationLength} organisation(s)</p>
          <div className="center size-sm">
            <div className="card shadow-sm card-body " > 
              <form className="px-4" onSubmit={this.onCreateOrganization}>

                <div className="card-title h3"> 
                  Création de compte pour votre organisation
                  <hr className="divider"/>
                </div>

                <div className="form-group mt-3 mb-2">
                      <label htmlFor="organization_name" className="form-label">Nom de l'organisation</label>
                      <input required type="text"
                            className="shadow-sm input"
                            placeholder="Entrez le nom de votre organisation"
                            onChange={event => this.setState({organizationName: event.target.value})}
                            value={this.state.organizationName}
                            name="organization_name" id="organization_name"/>
                </div>
              
                <div className="form-group my-2">
                  <label htmlFor="residency" className="form-label">Résidence</label>
                  <input required type="text"
                        onChange={event => this.setState({organizationResidency: event.target.value})}
                        value={this.state.organizationResidency}
                        className="shadow-sm input" 
                        placeholder="Entrez l'adresse de l'organisation" 
                        name="residency" id="residency"/>
                </div>
                
                <div className="form-group my-2">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea required  type="text" row="20" maxLength="100"
                            className="shadow-sm text-area"
                            placeholder="Entrez une brève description de votre organisation" 
                            onChange={event => this.setState({organizationDescription: event.target.value})}
                            value={this.state.organizationDescription}
                            name="description"
                            id="description"></textarea>
                </div>
                <button type="submit"  className="but shadow-sm">S'inscrire</button>

              </form>
          </div>
          </div>
        <div>
        {
          this.state.organizations.length > 0?
          <div className="table100 ver2 m-b-110">
            <div className="table100-head">
                <table>
                    <thead>
                        <tr className="row100 head">
                          <th className="cell100 column1">Nom</th>
                          <th className="cell100 column2">Description</th>
                          <th className="cell100 column3">Résidence</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="table100-body js-pscroll ps ps--active-y">
              <table>
                <tbody>
                {
                  this.state.organizations.map((singleOrganization,i) =>
                  (
                    <tr key={i} onClick={() => this.openModal(singleOrganization)}>
                      <td className="cell100 column1" key={0}>{singleOrganization.name}</td>
                      <td className="cell100 column1" key={1}>{singleOrganization.description}</td>
                      <td className="cell100 column1" key={3}>{singleOrganization.residence}</td>
                    </tr>
                ))}                  
                </tbody>
              </table>
              <div className="ps__rail-x" style={{left: "0px", bottom: "-603px"}}>
                <div className="ps__thumb-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
              </div>
            </div>
          </div>:
          <p>Il n'y a pas encore d'organisation</p>
        }
          </div>
          <Modal show={this.state.isOpen === true}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>{this.state.currentOrganization.name}</h1>
                <p>{this.state.currentOrganization.description}</p>
                <p>{this.state.currentOrganization.amount}</p>
                <small>{this.state.currentOrganization.residence}</small>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                  variant="secondary"
                  onClick={this.closeModal}
                  >Fermer
              </Button>
              {
                this.state.isDonationOpened? 
                <div className="donation">
                  <div>
                    <input type="number"
                        min="1"
                        max="10"
                        width="5"
                        value={this.state.value}
                        onChange={ event => this.setState({value: event.target.value})}/>
                  </div>
                  <Button 
                    className="btn primary"
                    variant="secondary"
                    onClick={this.onDonate}
                    >Valider
                  </Button>
                </div>
                :
                <Button 
                  className="btn primary"
                  variant="secondary"
                  onClick={this.openDonation}
                  >Faire un don
                </Button>
              }
              

              
            </Modal.Footer>
        </Modal>
        </div>
      }
        

      
        
      </div>
  )}
}

export default App;