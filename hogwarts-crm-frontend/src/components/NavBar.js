import React from 'react'
import { Nav } from "tabler-react";

export default function NavBar() {
    return (
        <Nav>
            <Nav.Item className="ml-4" value="Home" to="/" />
            <Nav.Item hasSubNav value="Students">
                <Nav.SubItem value="View all students" to="/students" />
                <Nav.SubItem value="Student Lookup" />
                <Nav.SubItem value="Add new student" to="/students/add-student" />
            </Nav.Item>
        </Nav>
    )
}