export class Client {
    clientId: number
    contactPersonName: string
    companyName: string
    address: string
    city: string
    pincode: string
    state: string
    employeeStrength: number
    gstNo: string
    contactNo: string
    regNo: string

    constructor() {
        this.clientId=0;
        this.employeeStrength = 0
        this.address = ''
        this.city=''
        this.state=''
        this.pincode =''
        this.companyName=''
        this.contactNo=''
        this.regNo=''
        this.gstNo=''
        this.contactPersonName=''
    } 
}

