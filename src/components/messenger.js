import React from 'react';
import { Link, Route } from 'react-router-dom';

import classNames from 'classnames'
import avatar from '../images/avatar.png'
import arrow from '../images/arrow.png'
import call from '../images/call.png'
import {OrderedMap} from 'immutable'
import _ from 'lodash'
import {ObjectID} from '../helpers/objectid'



/* Home component */


/* Category component */



/* App component */
export default class Messenger extends React.Component {
constructor(props){

		super(props);

		this.state = {
			height: window.innerHeight,
			newMessage: '',
			searchUser: "",
			showSearchUser: false,
			isExpanded:false
		}

		this._onResize = this._onResize.bind(this);
		this.handleSend = this.handleSend.bind(this)
		this.renderMessage = this.renderMessage.bind(this);
		this.scrollMessagesToBottom = this.scrollMessagesToBottom.bind(this);
		this._onCreateChannel = this._onCreateChannel.bind(this);
		this.renderChannelTitle = this.renderChannelTitle.bind(this);
		this.messenger=this.messenger.bind(this);
		this.Student=this.Student.bind(this);
		
	}
    

	renderChannelTitle(channel = {}){
		const {store} = this.props;

		const members = store.getMembersFromChannel(channel);	

		
		

		const names = [];

		members.forEach((user) => {

			const name = _.get(user, 'name');
			names.push(name);
		})

		//console.log(names);

		return <h2>{_.join(names, ',')}</h2>
	}

	_onCreateChannel(){

		const {store} = this.props;


		const channelId = new ObjectID().toString();
		const channel = {
				_id: channelId,
                title: "New Message",
                lastMessage: "",
                members: new OrderedMap(),
                messages: new OrderedMap(),
                isNew: true,
                created: new Date(),
		};

		store.onCreateNewChannel(channel);

		
	}
	scrollMessagesToBottom(){

		if(this.messagesRef){

			this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
		}
	}
	renderMessage(message){

		const text = _.get(message, 'body', '');

		const html = _.split(text, '\n').map((m, key) => {

			return <p key={key}dangerouslySetInnerHTML={{__html: m}} />
		})


		return html;
	}

	

    
	handleSend(){

		const {newMessage} = this.state;
		const {store} = this.props;



		// create new message

		if(_.trim(newMessage).length){

			const messageId = new ObjectID().toString();
			const channel = store.getActiveChannel();
			const channelId = _.get(channel, '_id', null);
			const currentUser = store.getCurrentUser();

			const message = {
				_id: messageId,
				channelId: channelId,
				body: newMessage,
				author: _.get(currentUser, 'name', null),
				avatar: avatar,
				me: true,

			};

            
			store.addMessage(messageId, message);

			this.setState({
				newMessage: '',
			})

		}

		


	}
	_onResize(){

		this.setState({
			height: window.innerHeight
		});
	}

	componentDidUpdate(){

	

		this.scrollMessagesToBottom();
	}

	componentDidMount(){

		

			window.addEventListener('resize', this._onResize);




	}


	componentWillUnmount(){

		window.removeEventListener('resize', this._onResize)

	}
    
    handletoggle(e){
    	e.preventDefault();
    	this.setState({
    		isExpanded:!this.state.isExpanded
    	})
    	//console.log(this.state.isExpanded);
    }

	    messenger() {
  const {store} = this.props;

		const {height} = this.state;

		const style= {
			height: height,
		};


        const activeChannel = store.getActiveChannel();
		const messages = store.getMessagesFromChannel(activeChannel); //store.getMessages();
		




		return (
				<div   className="app-messenger">
					<div className="header">
						<div className="sidebar-right">

						
							<div className="members">
                               
                              
							
								<div className="member1">
                               		<div className="user-image"><img src="https://api.adorable.io/avatars/100/abott@srishti.png" alt=".."/>
                               		</div>
                                </div>
                                <div className="member2">
                                	<div className="user-image" ><img src="https://api.adorable.io/avatars/100/abott@Akash.png" alt=".."/>
                                	</div>
                               </div>
                               <div className="member3">
                                	<div className="user-image"><img src="https://api.adorable.io/avatars/100/abott@Piyush.png" alt=".."/>
                                	</div>
                               </div>
                               <div className="member4">
                               		<div className="user-image"><img src="https://api.adorable.io/avatars/100/abott@Prakarsh.png" alt=".."/>
                               		</div>
                               	</div>
                               
							</div> 



						</div>
						
						<div className="content">
						 <centre> <Link to="/students" id="link">Chemistry</Link></centre>
						</div>
						<div className="right">
							<div className="user-bar">
								<div className="profile-name">
								</div>
								<div className="profile-image">
								</div>
							</div>

						</div>
					</div>
					<div className="main">
						
						<div className="content">
							<div ref={(ref) => this.messagesRef = ref} className="messages">

								{messages.map((message, index) => {



									return (
											<div key={index} className={classNames('message', {'me': message.me})}>
												<div className="message-user-image">
													<img src={message.avatar} alt="" />
												</div>
												<div className="message-body">
													<div className="message-author">{message.me ? 'You ' : message.author} say:</div>
													<div className="message-text">
													{this.renderMessage(message)}
													</div>
												</div>
											</div>
										)


								})}
								

							


							</div>

							 <div className="messenger-input">

									<div className="text-input">
										<input onKeyUp={(event) => {


											if(event.key === 'Enter' && !event.shiftKey){

												this.handleSend();

											}
											

										}} onChange={(event) => {

												

												this.setState({newMessage: _.get(event, 'target.value')});

										}} value={this.state.newMessage} placeholder="Write your messsage..." />
										<i className="fi-paperclip"></i>
									</div>
									
									<div className="actions">
										<img src={arrow} alt="sending.." onClick={this.handleSend} />
									</div>
							</div> 



						</div>
						
					</div>
				</div>
				)
}


Student(){
	

		const {height} = this.state;

		const style= {
			height: height,
		};


        
  return(
  <div>
  
  	<div  className="app-student">
		<div className="header">
			<div className="content">
				<h1>STUDENTS</h1>
			</div>
			<div className="middle">
				<div id="midimg">
					<img src={avatar} alt=""/>
				</div>
				<div id="good">Sai Varun
				</div>
				<div id="photomid"><img src={call} alt=""/>
				</div>
			</div>
						
						
			<div className="bottom">
				<div id="botimg"><img src={avatar} alt="" />
				</div>
				<div id="bad">Akash
				</div>
				<div id="photobot"><img src={call} alt=""/>
				</div>
			</div>
		</div>
					
	</div>

  </div>)
}
  render() {
    return (
      <div className="align">
			<div className="orange" onClick={(e)=> this.handletoggle(e)}>
			
				
				<Link to="/messenger">
        		
        		<svg height="662" width="80" onClick={this._onCreateChannel}>
  					<circle cx="50" cy="610" r="25"   fill="orange" />
				</svg>
				
				</Link>
        		
			</div>

          
           
          {this.state.isExpanded && <Route path="/messenger" component={this.messenger}/>} 
           <Route path="/students" component={this.Student}/>

      </div>
    )
  }
}