import React from "react";
import "semantic-ui-react";
import { connect } from "react-redux";
import { formatDate } from "../actions/"


class DateDropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentChosen: null
        };
    }

    // uses the clicked list-item in the dropdown to create an object to be passed into the dropdownUpdate action
    // updates specific object in the redux store
    updateValue = e => {
        const newValue = e.target.value

        if (this.props.hasDate && this.props.hasChosenDropdown) {
            alert("Changing the date format halfway through can cause issues, please refresh page!")
            console.log("Please refresh page")
            return
        }

        const obj = {
            dateFormat: newValue
        }
        this.props.formatDate(obj)
    }



    render() {

        let num = -1
        // helper function to list "options" based on the 'type' of field (numbers or letters...) 
        let filter = (f) => {
            num += 1
            if (num === 0)
                return <option key={num} value="Select Date Format" disabled selected hidden>Select Date Format</option>;
            else
                return <option key={num} value={f.title}>{f.title}</option>;
        };

        // creates the dropdown, uses filter() to specify which items are included in dropdown
        if (this.props.hasChosenDateFormat && this.props.hasChosenDropdown) {
            return (
                <select disabled className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }
        else {
            return (
                <select className="ui search dropdown" onChange={this.updateValue}>
                    {this.props.list.map((field) => filter(field))}
                </select>
            );
        }

    }
}

const mapStateToProps = (state) => {
    return {
        ent: state.entries,
        useOnce: state.useOnce,
        hasDate: state.hasChosenDateFormat,
        hasChosenDropdown: state.hasChosenDropdownOption,
        hasChosenDateFormat: state.hasChosenDateFormat
    };
};


export default connect(mapStateToProps, { formatDate })(DateDropdown);