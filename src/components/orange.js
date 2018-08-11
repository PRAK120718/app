import React, {Component} from 'react'
import Store from '../store'
import Messenger from './messenger'

export default class Orange extends Component{

	constructor(props){
		super(props);

		this.state = {

			store: new Store(this),
			val: false
		}
		//this.messenger=this.messenger.bind(this);
	}
 /*  messenger()
   {console.log("Please move forward");
   const {store} = this.state;

   	return <Messenger store={store} />
   		
   }*/
	render(){

		
const {store} = this.state;
		return <Messenger store={store} />
			
		
	}
}