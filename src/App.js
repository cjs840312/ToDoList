import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
			super(props);
			this.state = {value: '',Lists:[]};
			this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleDelete = this.handleDelete.bind(this);
		}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ value: "", Lists: this.state.Lists.concat([{name:this.state.value}]) });
		console.log(this.state)
	}

   handleDelete(e){
      var idx=this.state.Lists.findIndex(function(x){return x.name===e.name})
      var new_list = this.state.Lists
      new_list.splice(idx,1)
      this.setState( {TODOs: new_list} )
   }

   handleRename(e){
      console.log(e)
   }
	render() {

		return (
			<div className="App" style={{border:'solid'}}>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={ this.handleChange }></input>
					<input type="submit" value="add ToDoList" ></input>
				</form>
				{
					this.state.Lists.map((item) => (
						<TODOList key={item.name} name={item.name} delete={this.handleDelete.bind(this,item)} rename={this.handleRename} />
               ))

				}
			</div>
		);
	}

}

class TODOList extends Component{
	constructor(props) {
			super(props);
			this.state = {value: '',TODOs:[]};
			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleDelete = this.handleDelete.bind(this);
		}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ value: "", TODOs: this.state.TODOs.concat([{name:this.state.value}]) });
	}

	handleDelete(e){
		var idx=this.state.TODOs.findIndex(function(x){return x.name===e.name})
		var new_list = this.state.TODOs
		new_list.splice(idx,1)
		this.setState( {TODOs: new_list} )
	}

	render(){
		return (
			<menu className="TODOList" style={{border:'1px solid'}}>
				{this.props.name}
            <button style={{position:'absolute',right:'20%'}} onClick={this.props.rename.bind(this,"123")}>r</button>
            <button style={{position:'absolute',right:'10%'}} onClick={this.props.delete}>x</button>
				
            <form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.value} onChange={ this.handleChange }></input>
					<input type="submit" value="add ToDo" ></input>
				</form>
				{
					this.state.TODOs.map((item) => (
						<TODO key={item.name} name={item.name} delete={this.handleDelete.bind(this,item)}/>
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
		this.setState({
							checked: !this.state.checked,
							word: this.state.checked ? this.state.value : <s>{this.state.value}</s>
						 });
	}

	handleMouseEnter(){
		this.setState({ Mouse:true,color:'#DDDDDD'})
	}
	
	handleMouseLeave(){
		this.setState({ Mouse:false,color:'#ffffff'})
	}


	render(){
		return (
			<div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} 
					style={{backgroundColor:this.state.color}}
					onClick={this.handleClick}
					>					
				<input type="checkbox" className="TODO" checked={this.state.checked} onClick={this.handleClick}></input>
				<label>{this.state.word}</label>

				<button style={{position:'absolute',right:'10%'}} onClick={this.props.delete}>x</button>
			</div>
		)
	}
}

export default App;
