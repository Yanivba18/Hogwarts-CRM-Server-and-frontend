import React from 'react';
import { Button } from 'tabler-react';
import api from '../lib/api';

export default class SkillListItem extends React.Component {
    constructor(props) {
        super(props)
        this.student = props.studentName;
        this.skillName = props.skillName;
        this.listName = props.listName;
        this.apiAdapter = new api()
        this.state = {
            editMode: false,
            skillLevel: props.skillLevel,
            loading: false
        }
    }

    handleChange(e) {
        this.setState({ skillLevel: e.target.value })
    }

    handleClick(e) {
        switch (e.target.value) {
            case "cancel":
                this.setState({ editMode: false, skillLevel: this.props.skillLevel })
                break;
            case "save":
                this.setState({ editMode: false, loading: true })
                this.apiAdapter.editSkill({
                    action: "skills",
                    list: this.listName,
                    skill: this.skillName,
                    name: this.student,
                    level: this.state.skillLevel
                }).then((response) => {
                    this.setState({ loading: false })
                    console.log(response.data)
                })
                break;
            case "remove":
                this.setState({ editMode: false, loading: true })
                this.apiAdapter.editSkill({
                    action: "remove-skill",
                    list: this.listName,
                    name: this.student,
                    skill: this.skillName
                }).then((response) => {
                    this.setState({loading: false})
                    window.location.reload()
                })
                break;
            default:
                this.setState({ editMode: true })
        }
        // this.state.editMode ? this.setState({ editMode: false }) : this.setState({ editMode: true });
    }

    render() {
        return (
            <>
                {!this.state.editMode && this.skillName + " | Level: " + this.state.skillLevel}
                {!this.state.editMode && <Button className="link ml-5" onClick={(e) => this.handleClick(e)}>Edit</Button>}
                {this.state.editMode && (
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">{this.skillName + " level:"}</label>
                        <select value={this.state.skillLevel} id="inputState" className="form-control" onChange={(e) => this.handleChange(e)}>
                            <option>Choose level</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                )}
                {this.state.editMode &&
                    <div>
                        <Button className="link ml-5" value="cancel" onClick={(e) => this.handleClick(e)}>Cancel</Button>
                        <Button className="link ml-5" value="save" onClick={(e) => this.handleClick(e)}>Save</Button>
                        <Button className="link ml-5" value="remove" onClick={(e) => this.handleClick(e)}>Remove Skill</Button>

                    </div>
                }

            </>
        )
    }
}