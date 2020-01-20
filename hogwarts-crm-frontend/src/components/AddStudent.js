import React from 'react'
import { Form, Card, Button, Loader, Alert } from "tabler-react";
import api from '../lib/api'

export default class AddStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingSkills: true,
            loadingCourses: true,
            urlHasParams: false,
            success: false,
            sendingData: false
        }
        this.skills = [];
        this.courses = [];
        this.queryParams = useQuery()
        this.apiAdapter = new api()
    }

    componentDidMount() {
        this.apiAdapter.getSkills().then((response) => {
            this.skills = response.data;
            console.log(this.skills)
            this.setState({ loadingSkills: false })
        })

        this.apiAdapter.getCourses().then((response) => {
            this.courses = response.data;
            console.log(this.courses)
            this.setState({ loadingCourses: false })
        })

        if (this.queryParams.get("first-name")) {
            this.setState({ sendingData: true, urlHasParams: true })
            const firstName = this.queryParams.get("first-name");
            const lastName = this.queryParams.get("last-name");
            const studentSkills = createObjFromList(this.queryParams.getAll("skills"));
            const desiredSkills = createObjFromList(this.queryParams.getAll("desired"));
            const courses = this.queryParams.getAll("courses");

            let payload = {
                "first_name": firstName,
                "last_name": lastName,
                "skills": studentSkills,
                "desired_skills": desiredSkills,
                "courses": courses
            }

            console.log(payload)
            this.apiAdapter.addStudent(payload).then((response) => {
                console.log(response)
                this.setState({ sendingData: false, success: true })
            }).catch((err) => {
                console.log(err)
                this.setState({ sendingData: false })
            })

        }


    }


    render() {
        const addedSuccessfully = this.state.urlHasParams && !this.state.sendingData && this.state.success
        const errorAdding = this.state.urlHasParams && !this.state.sendingData && !this.state.success
        return (
            <Card>
                <Card.Header>
                    <Card.Title>Add Student</Card.Title>
                </Card.Header>
                {addedSuccessfully && (<Alert type="success" icon="check">
                    The student has been added successfully.
                    </Alert>)}
                {errorAdding && (<Alert type="danger" icon="alert-triangle">
                    Adding the student has failed, check that you are connected to the internet and try again.
                    </Alert>)}
                <Form method="get">

                    <Form.FieldSet>
                        <Form.Group label="First name" isRequired>
                            <Form.Input required name="first-name" />
                        </Form.Group>
                        <Form.Group label="Last name" isRequired>
                            <Form.Input required name="last-name" />
                        </Form.Group>
                    </Form.FieldSet>
                    <Form.Group label="Student's Existing Magic Skills (You can edit the levels later)" className="text-center" isRequired>
                        {this.state.loadingSkills && <Loader className="loader-fixed" />}
                        {!this.state.loadingSkills &&
                            <Form.SelectGroup
                                canSelectMultiple
                                pills
                                required
                                className="justify-content-center"
                            >
                                {this.skills.map((skill) => {
                                    return (
                                        <Form.SelectGroupItem
                                            key={skill}
                                            label={skill}
                                            name="skills"
                                            value={skill}
                                        />

                                    )
                                })}

                            </Form.SelectGroup>
                        }
                    </Form.Group>
                    <Form.Group label="Student's Desired Magic Skills (You can edit the levels later)" className="text-center">
                        {this.state.loadingSkills && <Loader className="loader-fixed" />}
                        {!this.state.loadingSkills &&
                            <Form.SelectGroup
                                canSelectMultiple
                                pills
                                className="justify-content-center"
                            >
                                {this.skills.map((skill) => {
                                    return (
                                        <Form.SelectGroupItem
                                            key={skill}
                                            label={skill}
                                            name="desired"
                                            value={skill}
                                        />

                                    )
                                })}

                            </Form.SelectGroup>
                        }
                    </Form.Group>
                    <Form.Group label="Courses the student is interested in" className="text-center">
                        {this.state.loadingCourses && <Loader className="loader-fixed" />}
                        {!this.state.loadingCourses &&
                            <Form.SelectGroup
                                canSelectMultiple
                                pills
                                className="justify-content-center"
                            >
                                {this.courses.map((course) => {
                                    return (
                                        <Form.SelectGroupItem
                                            key={course}
                                            label={course}
                                            name="courses"
                                            value={course}
                                        />

                                    )
                                })}

                            </Form.SelectGroup>
                        }
                    </Form.Group>
                    <Button type="submit" color="primary" value="Add Student" >Add Student</Button>
                </Form>
            </Card>
        )
    }
}

function useQuery() {
    return new URLSearchParams(window.location.search);
}

function OnSubmitMsg(props) {
    return (
        <Card>
            <h3>You have successfully added a student.</h3>
        </Card>
    )
}

function createObjFromList(list) {
    let obj = {};
    list.forEach((member) => {
        obj[member] = 1
    })
    return obj;
}