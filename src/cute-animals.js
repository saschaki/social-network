import React from "react";

export default class CuteAnimals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Sascha"
        };
        //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        console.log("cute-animals mounted");
        //good place for axios requests
        /*
        axios.get("/some-route-that-doesnt-exist").then(({data})=>{

        })*/

        setTimeout(() => {
            this.setState({ name: "pete" });
        }, 1000);
    }

    handleClick() {
        if (this.state.name == "pete") {
            this.setState({
                name: "david"
            });
        } else {
            this.setState({
                name: "pete"
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Cute Animals</h1>
                <p onClick={() => this.handleClick()}>{this.state.name}</p>
                <p onClick={this.handleClick.bind(this)}>{this.state.name}</p>
                <p>{this.props.cuteAnimal}</p>
            </div>
        );
    }
}
