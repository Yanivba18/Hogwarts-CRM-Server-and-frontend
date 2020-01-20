import React from 'react'
import { Loader, Card, Button, List } from "tabler-react";
import api from '../lib/api'

export default class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
        this.studentsList = []
        this.api = new api()
    }
    componentDidMount() {
        this.api.getStudents().then((response) => {
            this.studentsList = response.data
            console.log(this.studentsList)            
            this.setState({ loading: false })
        })
        
        // axios.get(this.URL).then((response) => {
        //     this.studentsList = response.data
        //     console.log(this.studentsList)
        
        // })

    }
    render() {
        return (
            <Card>
                <Card.Header>
                    <Card.Title>Students List</Card.Title>
                </Card.Header>
                {this.loading && <Loader />}
                {!this.loading && <List.Group>
                    {Object.keys(this.studentsList).map((student) => {
                        return (
                            <List.GroupItem action to={`/students/${student}`} key={this.studentsList[student].id}>
                                {this.studentsList[student].id + " " + student}
                            </List.GroupItem>)
                    }
                    )
                    }
                </List.Group>}
            </Card>
        )
    }
}

