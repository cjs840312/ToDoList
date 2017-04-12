import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
			super(props);
			this.state = {value: '',Lists:[]};
			this.handleChange = this.handleChange.bind(this);
			this.handleClick = this.handleClick.bind(this);
		}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleClick() {
		//this.setState({Lists : this.state.value <TODOList></TODOList> });

		this.setState({ value: "", Lists: this.state.Lists.concat([{id:this.state.Lists.length ,name:this.state.value}]) });
		console.log(this.state)
	}

	render() {

		return (
			<div className="App" style={{border:'solid'}}>
				<form>
					<input type="text" value={this.state.value} onChange={ this.handleChange }></input>
					<input type="button" value="add ToDoList" onClick={this.handleClick}></input>
				</form>
				{
					this.state.Lists.map((item) => (
						<TODOList key={item.id} name={item.name}/>
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
			this.handleClick = this.handleClick.bind(this);
		}

	handleChange(e){
		this.setState({ value: e.target.value });
	}

	handleClick() {
		this.setState({ value: "", TODOs: this.state.TODOs.concat([{id:this.state.TODOs.length ,name:this.state.value}]) });
		console.log(this.state)
	}

	render(){
		return (
			<div className="TODOList" style={{border:'1px solid'}}>
				{this.props.name}
				<form>
					<input type="text" value={this.state.value} onChange={ this.handleChange }></input>
					<input type="button" value="add ToDo" onClick={this.handleClick}></input>
				</form>
				{
					this.state.TODOs.map((item) => (
						<TODO key={item.id} name={item.name}/>
               ))

				}
			</div>
		)
	}
}

class TODO extends Component{
	render(){
		return (
			<div className="TODOList">
				{this.props.name}
			</div>
		)
	}
}

export default App;
