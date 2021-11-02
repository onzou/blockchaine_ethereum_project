import './App.css';
import { Component } from 'react';
import web3 from './web3';
import donation from './donation';

class App extends Component 
{
  state = {
    organizationLength: "",
    value: "",
    message: ""
  };

  organization = {
    name: "",
    description: "",
    address: "",
    amount: "",
  }

  organizations = [];

  gettingAllOrganizations = async ()=>
  {
    for(let i = 0; i< this.state.length; i++)
    {
      const singleOrganization = await donationManager.methods.orginations(0).call();
      this.organizations.push(singleOrganization);
    }    
  }
  componentDidMount = async ()=>
  {
    const organizationLength = await donationManager.methods.getOrganizationLength().call();
    this.setState({organizationLength});
    this.gettingAllOrganizations();

  }

  onSubscribe = async event =>
  {
    
  }


  onCreateOrganization = async event =>
  {
    event.preventDefault();
    this.setState({message: "Chargement...."})
    const accounts = await web3.eth.getAccounts();
    try 
    {
      await donation.methods.createOrganization(this.organization.name,this.organization.description).call();
                    
      /*
      .send(
                      {
                        from: accounts[0],
                        value: web3.utils.toWei(this.state.value, "ether")
                      });*/
      this.setState({message: "Vous avez été ajouté avec succès...."})
    }catch(error)
    {
      this.setState({message: "Erreur lors de l'ajout!"})
    }

  }

  onDonate = async event =>
  {
    event.preventDefault();
    this.setState({message: "Chargement...."})
    const accounts = await web3.eth.getAccounts();
    try 
    {
      await donation.methods.donate(this.organization.donationReceiver)
                    .send(
                    {
                      from: accounts[0],
                      value: web3.utils.toWei(this.state.value, "ether")
                    });

      this.setState({message: "Vous avez été ajouté avec succès...."})
      
    }catch(error)
    {
      this.setState({message: "Erreur lors de l'ajout!"})
    }
  }

  render() 
  {
    return (
      <div class="container">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        <div class="container">
          <div class="center size-sm">
            <div class="card shadow-sm card-body " > 
              <form class="px-4">

                <div class="card-title h3"> 
                  Création de compte pour votre organisation
                  <hr class="divider"/>
                </div>

                <div class="form-group mt-3 mb-2">
                      <label for="first_name" class="form-label">Prénom</label>
                      <input required type="text" class="shadow-sm input" placeholder="" name="first_name" id="first_name"/>
                </div>
              
                <div class="form-group my-2">
                  <label for="last_name" class="form-label">Nom</label>
                  <input required type="text" class="shadow-sm input" placeholder="" name="last_name" id="last_name"/>
                </div>
              
                <div class="form-group my-2">
                  <label for="service" class="form-label">Service</label>
                  <input required type="text" class="shadow-sm input" placeholder="" name="service" id="service"/>
                </div>
                
                <div class="form-group my-2">
                  <label for="service" class="form-label">Description</label>
                  <textarea required  type="text" class="shadow-sm text-area" placeholder="" row="20" name="service" id="service"></textarea>
                </div>

              <button type="submit" class="but shadow-sm">S'inscrire</button>
              </form>
          </div>
          </div>
          
        </div>

        
      </div>
  )}
}

export default App;