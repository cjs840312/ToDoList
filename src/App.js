import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {value: '',Lists:[],finished:0,unfinished:0};
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		var tempName=this.state.value;
		if(this.state.Lists.findIndex(function(x){return x.name===tempName})===-1 ){
			this.setState({ value: "", Lists: this.state.Lists.concat([{name:tempName}]) });	
		}
		else{
			alert("Don't Repeat the same name")
		}

		
	}

   handleDelete(e,a){
   	console.log(e)
      var idx=this.state.Lists.findIndex(function(x){return x.name===e.name})
      var new_list = this.state.Lists
      new_list.splice(idx,1)
	  var newFinish = (this.state.finished - a[0])
	  var newUnFinish = (this.state.unfinished - a[1])
      this.setState( {TODOs: new_list,finished:newFinish,unfinished:newUnFinish} )
   }

   handleRename(e){
		var idx=this.state.Lists.findIndex(function(x){return x.name===e[0]})
		var new_list = this.state.Lists
		new_list[idx].name=e[1]
		this.setState( {TODOs: new_list} )
   }
   handleCount(e){
   		var newFinish = (this.state.finished + e[0])
		var newUnFinish = (this.state.unfinished + e[1])
		this.setState({finished:newFinish,unfinished:newUnFinish})
   }

	render() {

		return (
			<div className="App" style={{border:'solid'}}>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={ this.handleChange }></input>
					<input type="submit" value="add ToDoList" ></input>
					{"finished : "+this.state.finished + "  unfinished: "+this.state.unfinished}
				</form>
				{

					this.state.Lists.map((item) => (
						<TODOList key={item.name} name={item.name} delete={this.handleDelete.bind(this,item)} rename={this.handleRename.bind(this)} finish={this.handleCount.bind(this)} />
               ))

				}
			</div>
		);
	}

}

class TODOList extends Component{
	constructor(props) {
			super(props);
			this.state = {value: '',TODOs:[],Rename:false,finished:0,unfinished:0};
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleDelete = this.handleDelete.bind(this);
		}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		var tempName=this.state.value;
		if(this.state.TODOs.findIndex(function(x){return x.name===tempName})===-1 ){
			this.setState({ value: "", TODOs: this.state.TODOs.concat([{name:this.state.value}]) ,unfinished:this.state.unfinished+1});
			this.props.finish([0,1])
		}
		else{
			alert("Don't Repeat the same name")
		}

		

	}

	handleDelete(e,a){
		console.log(e)
		console.log(a)
		var idx=this.state.TODOs.findIndex(function(x){return x.name===e.name})
		var new_list = this.state.TODOs
		new_list.splice(idx,1)
		this.setState( {TODOs: new_list, finished:this.state.finished+(a?-1:0),unfinished:this.state.unfinished+(a?0:-1) } )
		this.props.finish(a?[-1,0]:[0,-1])
	}
	TypeName(){
		if(!this.state.Rename){
			this.setState({Rename:true})
		}
		else{
			this.UpdateName({key:'Enter'})
		}
	}
	UpdateName(e){
		if (e.key ==='Enter'){
			this.props.rename([this.props.name,this.refs.rename.value])
			this.setState({Rename:false})
		}
	}
	handleCheck(e){
		var newFinish= e? this.state.finished+1 :this.state.finished-1
		var newUnFinish= e? this.state.unfinished-1 :this.state.unfinished+1
		this.setState({finished:newFinish,unfinished:newUnFinish})
		this.props.finish(e?[1,-1]:[-1,1])
	}


	render(){
		return (
			<menu className="TODOList" style={{border:'1px solid',width:'80%' }}>
			{ (!this.state.Rename&&<b>{this.props.name}</b>) || <input type="text" defaultValue={this.props.name} onKeyPress={this.UpdateName.bind(this)} ref='rename'/> }
            		
            <button style={{position:'absolute',right:'20%'}} onClick={this.TypeName.bind(this)}>rename</button>
            <button style={{position:'absolute',right:'10%'}} onClick={this.props.delete.bind(this,[this.state.finished,this.state.unfinished])}>x</button>
			<div>
            {"finished : "+this.state.finished + "  unfinished: "+this.state.unfinished}
            </div>	
            <form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={ this.handleChange }></input>
					<input type="submit" value="add ToDo" ></input>
				</form>
				{
					this.state.TODOs.map((item) => (
						<TODO key={item.name} name={item.name} delete={this.handleDelete.bind(this,item)} checked={this.handleCheck.bind(this)}/>
               		))

				}
			</menu>
		)
	}
}

class TODO extends Component{
	constructor(props) {
		super(props);
		this.state ={ value: props.name,checked:false,word:props.name,Mouse:false,color:'#ffffff'};
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseLeave = this.handleMouseLeave.bind(this)
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		this.props.checked(!this.state.checked)
		this.setState({
							checked: !this.state.checked,
							word: this.state.checked ? this.state.value : <s>{this.state.value}</s>
						 });
	}

	handleMouseEnter(){	this.setState({ Mouse:true,color:'#DDDDDD'})}
	
	handleMouseLeave(){	this.setState({ Mouse:false,color:'#ffffff'})}


	render(){
		return (
			<div>
				<div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} 
						style={{backgroundColor:this.state.color,width:'80%'}}
						/*onClick={this.handleClick}*/
						>					
					<input type="checkbox" className="TODO" checked={this.state.checked} onClick={this.handleClick}></input>
					<label>{this.state.word}</label>
					<button style={{position:'absolute',right:'10%'}} onClick={this.props.delete.bind(this,this.state.checked)}>x</button>
				</div>
			</div>
		)
	}
}

export default App;
