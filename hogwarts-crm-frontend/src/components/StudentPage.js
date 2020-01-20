import React, { useState } from 'react'
import api from '../lib/api'
import { useParams } from 'react-router-dom'
import {
    Container,
    Grid,
    Card,
    Button,
    Form,
    Avatar,
    Profile,
    List,
    Media,
    Text,
    Loader,
} from "tabler-react";
import SkillListItem from './SkillListItem';
import CourseListItem from './CourseListItem';


function StudentPage() {
    const { studentName } = useParams();
    const [student, setStudent] = useState();
    const [loading, setLoading] = useState(true);
    const apiAdapter = new api();

    if (loading) {
        apiAdapter.getStudent(studentName).then((response) => {
            setStudent(response.data)
            setLoading(false)

            console.log("Got student: ", response.data)
        })

    }

    return (
        <>
            <div className="my-3 my-md-5">
                <Container>
                    <Grid.Row>
                        <Grid.Col lg={4}>
                            <Card>
                                <Card.Body>
                                    <Media>
                                        <Media.BodySocial
                                            name={studentName}
                                            workTitle="Student"
                                            
                                        >
                                            {/* <Media.List>
                                                <Media.ListItem>
                                                    Test
                                                </Media.ListItem>
                                            </Media.List> */}
                                        </Media.BodySocial>
                                    </Media>
                                </Card.Body>
                            </Card>
                        </Grid.Col>
                        <Grid.Col lg={8}>
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Student's existing magic skills
                                    </Card.Title>
                                </Card.Header>
                                {loading && <Loader className="ml-5" />}
                                {!loading && (<List.Group>
                                    {student.magic_skills ? Object.keys(student.magic_skills).map((skill) => {
                                        return (
                                            <List.GroupItem key={skill}>
                                                <SkillListItem listName="magic_skills" studentName={studentName} skillName={skill} skillLevel={student.magic_skills[skill]} />
                                            </List.GroupItem>
                                        )
                                    })
                                        :
                                        <List.GroupItem>
                                            No skills added yet. Add some now in the edit screen.
                                        </List.GroupItem>
                                    }
                                </List.Group>)}
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Student's desired magic skills
                                    </Card.Title>
                                </Card.Header>
                                {loading && <Loader className="ml-5" />}
                                {!loading && (<List.Group>
                                    {student.desired_magic_skills ? Object.keys(student.desired_magic_skills).map((skill) => {
                                        return (
                                            <List.GroupItem key={skill}>
                                                <SkillListItem listName="desired_magic_skills" studentName={studentName} skillName={skill} skillLevel={student.desired_magic_skills[skill]} />
                                            </List.GroupItem>
                                        )
                                    })
                                        :
                                        <List.GroupItem>
                                            No skills added yet. Add some now in the edit screen.
                                        </List.GroupItem>
                                    }
                                </List.Group>)}
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Card.Title>
                                        Student is interested in the following courses:
                                    </Card.Title>
                                </Card.Header>
                                {loading && <Loader className="ml-5" />}
                                {!loading && (<List.Group>
                                    {student.courses ? student.courses.map((course) => {
                                        return (
                                            <List.GroupItem key={course}>
                                                <CourseListItem studentName={studentName} courseName={course} />
                                            </List.GroupItem>
                                        )
                                    })
                                        :
                                        <List.GroupItem>
                                            No courses added yet. Add some now in the edit screen.
                                        </List.GroupItem>
                                    }
                                </List.Group>)}
                            </Card>

                            {/* <Form className="card">
                                <Card.Body>
                                    <Card.Title>Edit Profile</Card.Title>
                                    <Grid.Row>
                                        <Grid.Col md={5}>
                                            <Form.Group>
                                                <Form.Label>Company</Form.Label>
                                                <Form.Input
                                                    type="text"
                                                    disabled
                                                    placeholder="Company"
                                                    value="Creative Code Inc."
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col sm={6} md={3}>
                                            <Form.Group>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="Username"
                                                    value="michael23"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col sm={6} md={4}>
                                            <Form.Group>
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Input type="email" placeholder="Email" />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col sm={6} md={6}>
                                            <Form.Group>
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value="Chet"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col sm={6} md={6}>
                                            <Form.Group>
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value="Faker"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Address</Form.Label>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="Home Address"
                                                    value="Melbourne, Australia"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col sm={6} md={4}>
                                            <Form.Group>
                                                <Form.Label>City</Form.Label>
                                                <Form.Input
                                                    type="text"
                                                    placeholder="City"
                                                    value="Melbourne"
                                                />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col sm={6} md={3}>
                                            <Form.Group>
                                                <Form.Label>Postal Code</Form.Label>
                                                <Form.Input type="number" placeholder="ZIP Code" />
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col md={5}>
                                            <Form.Group>
                                                <Form.Label>Country</Form.Label>
                                                <Form.Select>
                                                    <option>Germany</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Grid.Col>
                                        <Grid.Col md={12}>
                                            <Form.Group className="mb=0" label="About Me">
                                                <Form.Textarea
                                                    rows={5}
                                                    placeholder="Here can be your description"
                                                >
                                                    Oh so, your weak rhyme You doubt I'll bother, reading
                                                    into it I'll probably won't, left to my own devices
                                                    But that's the difference in our opinions.
                        </Form.Textarea>
                                            </Form.Group>
                                        </Grid.Col>
                                    </Grid.Row>
                                </Card.Body>
                                <Card.Footer className="text-right">
                                    <Button type="submit" color="primary">
                                        Update Profile
                  </Button>
                                </Card.Footer>
                            </Form> */}
                        </Grid.Col>
                    </Grid.Row>
                </Container>
            </div>
        </>
    );
}

export default StudentPage;