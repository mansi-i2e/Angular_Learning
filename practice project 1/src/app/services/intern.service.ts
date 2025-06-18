import { Injectable } from '@angular/core';

export interface Intern {
    InternID: number;
    FullName: string;
    Department: string;
    University: number;
    Email: string;
    Phone: string;
    InternshipStartDate: Date;
    InternshipEndDate: Date;
    Address: string;
    City: string;
    Country: string;
    Photo: string;
    Supervisor: string;
    Notes: string;
}

const interns: Intern[] = [
    {
        InternID: 1,
        FullName: "Amit Sharma",
        Department: "Software Development",
        University: 1,
        Email: "amit.sharma@iitd.ac.in",
        Phone: "9876543210",
        InternshipStartDate: new Date("2025-05-01"),
        InternshipEndDate: new Date("2025-07-31"),
        Address: "Sector 21, Rohini",
        City: "Delhi",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/men/32.jpg",
        Supervisor: "Mr. Rahul Mehta",
        Notes: "Working on Angular-based web applications. Quick learner and team player."
    },
    {
        InternID: 2,
        FullName: "Sneha Patel",
        Department: "Data Analytics",
        University: 2,
        Email: "sneha.patel@bitspilani.ac.in",
        Phone: "9123456780",
        InternshipStartDate: new Date("2025-05-15"),
        InternshipEndDate: new Date("2025-08-15"),
        Address: "MG Road",
        City: "Bangalore",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/women/44.jpg",
        Supervisor: "Ms. Priya Nair",
        Notes: "Involved in dashboard creation and visualization tasks using Power BI."
    },
    {
        InternID: 3,
        FullName: "Ravi Verma",
        Department: "Cloud Solutions",
        University: 4,
        Email: "ravi.verma@iiit.ac.in",
        Phone: "9823012345",
        InternshipStartDate: new Date("2025-06-01"),
        InternshipEndDate: new Date("2025-08-31"),
        Address: "Civil Lines",
        City: "Nagpur",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/men/45.jpg",
        Supervisor: "Mr. Ajay Kumar",
        Notes: "Hands-on with Azure cloud services and DevOps pipelines."
    },
    {
        InternID: 4,
        FullName: "Neha Reddy",
        Department: "UI/UX Design",
        University: 3,
        Email: "neha.reddy@nitt.edu",
        Phone: "9811122233",
        InternshipStartDate: new Date("2025-05-10"),
        InternshipEndDate: new Date("2025-08-10"),
        Address: "Jubilee Hills",
        City: "Hyderabad",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/women/65.jpg",
        Supervisor: "Ms. Kavita Rao",
        Notes: "Designing user-friendly interfaces and conducting user testing."
    },
    {
        InternID: 5,
        FullName: "Anuj Deshmukh",
        Department: "Cybersecurity",
        University: 5,
        Email: "anuj.deshmukh@vnit.edu",
        Phone: "9977665544",
        InternshipStartDate: new Date("2025-05-05"),
        InternshipEndDate: new Date("2025-07-30"),
        Address: "FC Road",
        City: "Pune",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/men/28.jpg",
        Supervisor: "Mr. Sanjay Desai",
        Notes: "Performing vulnerability scans and penetration testing simulations."
    },
    {
        InternID: 6,
        FullName: "Pooja Sinha",
        Department: "Marketing & Communications",
        University: 2,
        Email: "pooja.sinha@bitspilani.ac.in",
        Phone: "8888999900",
        InternshipStartDate: new Date("2025-06-01"),
        InternshipEndDate: new Date("2025-08-20"),
        Address: "Park Street",
        City: "Kolkata",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/women/55.jpg",
        Supervisor: "Ms. Ruchi Bansal",
        Notes: "Handling social media strategy and content planning."
    },
    {
        InternID: 7,
        FullName: "Karan Singh",
        Department: "Backend Development",
        University: 4,
        Email: "karan.singh@iiit.ac.in",
        Phone: "9666443322",
        InternshipStartDate: new Date("2025-05-20"),
        InternshipEndDate: new Date("2025-08-20"),
        Address: "Model Town",
        City: "Ludhiana",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/men/67.jpg",
        Supervisor: "Mr. Nitin Thakur",
        Notes: "Developing REST APIs using Node.js and Express."
    },
    {
        InternID: 8,
        FullName: "Aisha Khan",
        Department: "Machine Learning",
        University: 1,
        Email: "aisha.khan@iitd.ac.in",
        Phone: "9090901234",
        InternshipStartDate: new Date("2025-06-10"),
        InternshipEndDate: new Date("2025-09-10"),
        Address: "Rajendra Nagar",
        City: "Delhi",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/women/70.jpg",
        Supervisor: "Dr. Zoya Siddiqui",
        Notes: "Training ML models for image classification and text prediction."
    },
    {
        InternID: 9,
        FullName: "Vikrant Joshi",
        Department: "Quality Assurance",
        University: 5,
        Email: "vikrant.joshi@vnit.edu",
        Phone: "9988776655",
        InternshipStartDate: new Date("2025-05-01"),
        InternshipEndDate: new Date("2025-07-15"),
        Address: "Infantry Road",
        City: "Bangalore",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/men/22.jpg",
        Supervisor: "Ms. Anjali Sen",
        Notes: "Responsible for test case writing and automation testing using Selenium."
    },
    {
        InternID: 10,
        FullName: "Meera Iyer",
        Department: "Business Analysis",
        University: 3,
        Email: "meera.iyer@nitt.edu",
        Phone: "9876781234",
        InternshipStartDate: new Date("2025-05-25"),
        InternshipEndDate: new Date("2025-08-25"),
        Address: "Anna Nagar",
        City: "Chennai",
        Country: "India",
        Photo: "https://randomuser.me/api/portraits/women/25.jpg",
        Supervisor: "Mr. Shashank Jain",
        Notes: "Analyzing business needs and assisting in project documentation."
    }
];


@Injectable({
    providedIn: 'root'
})
export class InternService {

    constructor() { }

    getInterns(): Intern[] {
        return interns;
    }


}
