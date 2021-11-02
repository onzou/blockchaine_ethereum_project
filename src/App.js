import './App.css';
import { Component } from 'react';
import web3 from './web3';
import donation  from './donation';

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
      const singleOrganization = await donation.methods.orginations(0).call();
      this.organizations.push(singleOrganization);
    }    
  }
  
  componentDidMount = async ()=>
  {
    const organizationLength = await donation.methods.getOrganizationLength().call();
    this.setState({organizationLength});
    this.gettingAllOrganizations();

  }

  onSubscribe = async event =>
  {
    event.preventDefault();
    this.setState({message: "Chargement...."})
    try 
    {
      await donation.methods.createOrganization(this.organization.name,this.organization.description).call();
      this.setState({message: "Vous avez été ajouté avec succès...."})
    }catch(error)
    {
      this.setState({message: "Erreur lors de l'ajout!"})
    }
  }


  onCreateOrganization = async event =>
  {
    event.preventDefault();
    this.setState({message: "Chargement...."})
    try 
    {
      await donation.methods.createOrganization(this.organization.name,this.organization.description).call();
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

      this.setState({message: "Donation fait avec succès...."})

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
                      <label for="organization_name" class="form-label">Nom de l'organisation</label>
                      <input required type="text" class="shadow-sm input" placeholder="" name="organization_name" id="organization_name"/>
                </div>
              
              
                <div class="form-group my-2">
                  <label for="service" class="form-label">Addresse</label>
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

      <div>
      <div class="table100 ver2 m-b-110">
          <div class="table100-head">
              <table>
                  <thead>
                      <tr class="row100 head">
                          <th class="cell100 column1">Nom</th>
                          <th class="cell100 column2">Description</th>
                          <th class="cell100 column3">Addresse</th>
                      </tr>
                  </thead>
              </table>
          </div>
          <div class="table100-body js-pscroll ps ps--active-y">
              <table>
                  <tbody>
                      <tr class="row100 body">
                          <td class="cell100 column1">Like a butterfly</td>
                          <td class="cell100 column2">Boxing</td>
                          <td class="cell100 column3">9:00 AM - 11:00 AM</td>
                      </tr>
                      <tr class="row100 body">
                          <td class="cell100 column1">Mind &amp; Body</td>
                          <td class="cell100 column2">Yoga</td>
                          <td class="cell100 column3">8:00 AM - 9:00 AM</td>
                      </tr>
                      <tr class="row100 body">
                          <td class="cell100 column1">Crit Cardio</td>
                          <td class="cell100 column2">Gym</td>
                          <td class="cell100 column3">9:00 AM - 10:00 AM</td>
                      </tr>
                      <tr class="row100 body">
                          <td class="cell100 column1">Wheel Pose Full Posture</td>
                          <td class="cell100 column2">Yoga</td>
                          <td class="cell100 column4">Donna Wilson</td>
                      </tr>
                     
                  </tbody>
              </table>
              <div class="ps__rail-x" style={{left: "0px", bottom: "-603px"}}>
                  <div class="ps__thumb-x" tabindex="0" style={{left: "0px", width: "0px"}}></div>
              </div>
          </div>
      </div>
</div>
        
      </div>
  )}
}

export default App;