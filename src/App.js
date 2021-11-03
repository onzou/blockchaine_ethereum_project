import './App.css';
import { Component } from 'react';
import web3 from './web3';
import donation  from './donation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class App extends Component 
{

  state = {
    organizationLength: "",
    value: "",
    message: "",
    organizationName: "",
    organizationResidency: "",
    organizationDescription: "",

  };

  organization = {
    name: "",
    description: "",
    residency: "",
    amount: "",
  }

  organizations = [];

  gettingAllOrganizations = async ()=>
  {
    for(let i = 0; i< this.state.length; i++)
    {
      const singleOrganization = await donation.methods.orginations(i).call();
      this.organizations.push(singleOrganization);
    }    
    console.log(this.organizations);
  }
  
  componentDidMount = async ()=>
  {
    const organizationLength = await donation.methods.getOrganizationLength().call();
    this.setState({organizationLength});
    this.gettingAllOrganizations();

  }

  onCreateOrganization = async event =>
  {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    toast.promise( async()=>
    {
      await donation.methods.createOrganization(this.organization.name,this.organization.description, this.organization.residency)
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

  onDonate = async event =>
  {
    event.preventDefault();
    this.setState({message: "Chargement...."})
    const accounts = await web3.eth.getAccounts();
    try 
    {
      toast("Chargement...",{autoClose: false});
      await donation.methods.donate(this.organization.donationReceiver)
                    .send(
                    {
                      from: accounts[0],
                      value: web3.utils.toWei(this.state.value, "ether")
                    });

      toast.success("Donation réussie...",{autoClose: 2000});
    }catch(error)
    {
      toast.error("Erreur...",{autoClose: 2000});

    }
  }

  render() 
  {
    return (
      <div className="container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"/>
        <p>il y a {this.state.organizationLength} organisation(s)</p>
        <div className="container">
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
          
        </div>

      <div>
      <div className="table100 ver2 m-b-110">
          <div className="table100-head">
              <table>
                  <thead>
                      <tr className="row100 head">
                          <th className="cell100 column1">Nom</th>
                          <th className="cell100 column2">Description</th>
                          <th className="cell100 column3">Addresse</th>
                      </tr>
                  </thead>
              </table>
          </div>
          <div className="table100-body js-pscroll ps ps--active-y">
              <table>
                  <tbody>
                      <tr className="row100 body">
                          <td className="cell100 column1">Like a butterfly</td>
                          <td className="cell100 column2">Boxing</td>
                          <td className="cell100 column3">9:00 AM - 11:00 AM</td>
                      </tr>
                      <tr className="row100 body">
                          <td className="cell100 column1">Mind &amp; Body</td>
                          <td className="cell100 column2">Yoga</td>
                          <td className="cell100 column3">8:00 AM - 9:00 AM</td>
                      </tr>
                      <tr className="row100 body">
                          <td className="cell100 column1">Crit Cardio</td>
                          <td className="cell100 column2">Gym</td>
                          <td className="cell100 column3">9:00 AM - 10:00 AM</td>
                      </tr>
                      <tr className="row100 body">
                          <td className="cell100 column1">Wheel Pose Full Posture</td>
                          <td className="cell100 column2">Yoga</td>
                          <td className="cell100 column4">Donna Wilson</td>
                      </tr>
                     
                  </tbody>
              </table>
              <div className="ps__rail-x" style={{left: "0px", bottom: "-603px"}}>
                  <div className="ps__thumb-x" tabIndex="0" style={{left: "0px", width: "0px"}}></div>
              </div>
          </div>
      </div>
</div>
        
      </div>
  )}
}

export default App;