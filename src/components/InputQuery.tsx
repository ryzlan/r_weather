import * as React from 'react';


import items from '../data/cities';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup';
type item={
  city:string,
  country:string
}

interface State{
  address:string ,
  filteredCities:item[],
  selectedCity: string[],
  error:string,
  toggle:string
}

interface Props{
  handleSubmit: (city:string  , country :string ) => void
}

export default class InputQuery extends React.Component<Props,State> {
  constructor(props :any){
    super(props);
    this.state={
      address:'',
      filteredCities:items,
      selectedCity:[],
      error:'',
      toggle:'none'
    }
  }

handleSubmit=(e : any)=>{
  e.preventDefault();

  this.setState({
    toggle:'none'
  })

  if(this.state.address === ""){
      this.setState(
        {
          error:"Please Select a Option"
        }
      )
  }else if(this.state.selectedCity.length <1){
      this.setState({
        error:"Please select an Option from the list"
      })
    }else{
      let add = this.state.address.split(',')

      console.log("Send Value ", add);
      this.props.handleSubmit(add[0], add[1]);
    }
    
  
  this.setState({
    address:'',
  })
}
selectOption=(a :string ,b :string )=>{
let add = a+","+b;


this.setState({
    address:add,
    toggle:'none',
    selectedCity:[add]
});
}



handleChange=(e :any  )=>{
e.preventDefault();
this.setState({
  address:e.target.value.trim(),
  error:'',
  selectedCity:[]

});
let currentCities= [];
let newCities=[];
  if(e.target.value !== ""){
    currentCities=items;
    newCities= currentCities.filter((item :item )=>{
      const lc = item.city.toLowerCase();
      const filter =e.target.value.trim().toLowerCase();
      return lc.includes(filter);
    });

  }else{
    newCities=this.state.filteredCities;
  }
  
  this.setState({
    filteredCities:newCities
  });

}
showFilter =()=>{
this.setState({
  toggle:'block',
  error:''
})
}
hideFilter =()=>{
  this.setState({
    toggle:'none'
  })
  }
  
  public render() {
    
    return (
      <>
      
      <div className="search" >
                <InputGroup >
                <FormControl  type="text" id="city" required
                  placeholder="Select a City ..."
                  name="address"
                  onChange={this.handleChange}
                  onFocus={this.showFilter}
                  
                  value={this.state.address}
                  className="searchTerm mr-sm-2"
                  />
                  <InputGroup.Append>
                  <Button type="submit" className="searchButton" variant="outline-info" onClick={this.handleSubmit }>Search
                  </Button>
                  </InputGroup.Append>
                  
                </InputGroup>
                  
           
                  <ul className="input__list " style={{display:this.state.toggle}}>
                  {this.state.filteredCities.map(
                    (city :item ,index :number)=>
                        <li key={index} onClick={()=>{this.selectOption(city.city,city.country)}}
                        >{city.city},{city.country}
                        </li>
                        
                       )}
                  </ul>
                  {this.state.error &&  <p className="error_list">{this.state.error}</p>}
                  
                  </div>
     </>
    );
  }
}
