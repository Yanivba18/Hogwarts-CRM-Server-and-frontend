import React from 'react';
import { Button } from 'tabler-react';
import api from '../lib/api';

export default class CourseListItem extends React.Component {
    constructor(props) {
        super(props)
        this.student = props.studentName;
        this.courseName = props.courseName;
        this.apiAdapter = new api()
        this.state = {
            editMode: false,
            loading: false
        }
    }

    handleClick(e) {
        switch (e.target.value) {
            case "cancel":
                this.setState({ editMode: false })
                break;
            case "remove":
                this.setState({ editMode: false, loading: true })
                this.apiAdapter.editSkill({
                    action: "remove-course",
                    name: this.student,
                    skill: "None",
                    list: "courses",
                    course: this.courseName
                }).then((response) => {
                    this.setState({ loading: false })
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
                {this.courseName}
                {!this.state.editMode && <Button className="link ml-5" onClick={(e) => this.handleClick(e)}>Edit</Button>}
                {this.state.editMode &&
                    <div>
                        <Button className="link ml-5" value="cancel" onClick={(e) => this.handleClick(e)}>Cancel</Button>
                        <Button className="link ml-5" value="remove" onClick={(e) => this.handleClick(e)}>Remove Course</Button>

                    </div>
                }

            </>
        )
    }
}