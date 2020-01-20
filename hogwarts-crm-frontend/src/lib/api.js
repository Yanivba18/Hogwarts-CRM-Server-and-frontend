import axios from 'axios'

export default class api {
    constructor() {
        this.baseURL = "http://localhost:5000/";

    }
    
    getStudents = () => {
        return axios.get(`${this.baseURL}students/`)
    }

    getStudent = (studentName) => {
        return axios.get(`${this.baseURL}students/${studentName}`)
    }

    editSkill = (payload) => {
        return axios({
            method: 'POST',
            url: this.baseURL + `students/edit/`,
            data: payload
        })
    }

    addStudent = (payload) => {
        return axios({
            method: 'POST',
            url: this.baseURL + "students/new-student/", 
            data: payload
        })
            
    }

    getCourses = () => {
        return axios.get(this.baseURL + "courses-list/")
    }

    getSkills = () => {
        return axios.get(`${this.baseURL}skills/`)
    }
}

