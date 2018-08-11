import React, {Component} from 'react'
import {Route} from 'react-router-dom'

const student= ()=>(
	<html>
	<body>
	<div>STUDENT</div>
	</body>
	</html>
	);


const SwitchDemo= ()=>(
    
    <Route exact={true} path="/student" component={student}/>
    
    );

    export default SwitchDemo;