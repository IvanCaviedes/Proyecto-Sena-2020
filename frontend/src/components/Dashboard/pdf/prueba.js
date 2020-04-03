import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export default class prueba extends Component {
  constructor(props) {
    super(props);
    this.state={
      Tusuarios:[]
    }
  }
  componentDidMount(){
    this.listar();
  }
  listar = (e) => {
    const token12 = localStorage.getItem('token')
    const envio = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:4000',
            'Accept': 'application/json',
            "Access-Control-Allow-Origin": '*',
            'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
            'Allow': 'GET, POST, OPTIONS, PUT, DELETE',
            'Authorization': `${token12}`
        }
    };
    fetch('http://localhost:4000/user/', envio)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('Usuario no creado')
        })
        .then(token => {
            this.setState({ Tusuarios: token.users })
            return;
        })
        .catch(e => {
            this.setState({ mensaje: e.message })
        })
}
  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 10, -90);
        pdf.save("Usuarios.pdf");
      })
    ;
  }
  render() {
    return (
      <div>
      <div id="divToPrint" className="mt4" style={{background:'#fff',width: '210mm',minHeight: '297mm',marginLeft: 'auto',marginRight: 'auto'}}>
        <h1 className="text-center mt-2">Reporte usuarios</h1>
<br/>
<br/>
<br/>
<h3 className="text-center">Ultimos usuarios registrados</h3>

<br/>
<br/>
<br/>
        <div class="table-responsive">
                                    <table class="table align-items-center table-flush">
                                        <thead class="thead-light">
                                            <tr>
                                                <th scope="col">Nombre</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Rol</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.Tusuarios.map(user => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.role}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
      </div>
      <div className="mb5">
        <button className="btn btn-primary btn-block" onClick={this.printDocument}>Print</button>
      </div>
      </div>
        )
  }
}
