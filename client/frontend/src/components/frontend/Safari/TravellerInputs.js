import { Component } from "react";

class TravellerInputs extends Component {
  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.props.onChange({
      ...this.props.value,
      [name]: value
    });
  };

  render() {
    const { value: user } = this.props;

    return (
      <>
        <div className='col-sm-2 col-12'>
        {/* <label for="label-control">Full name</label> */}
        <input
          className="form-control tname"
          name="name"
          value={user.name}
          onChange={this.handleChange}
          placeholder="Full Name"
          type="text"
        />
        </div>
        <div className='col-sm-2 col-12 order'>
        {/* <label for="label-control">Gender</label> */}
            <select className="form-control tgender" name="gender" value={user.gender} onChange={this.handleChange}>
                <option>Gender</option>
                <option value = "Male">Male</option>
                <option value = "Female">Female</option>
            </select>
        </div>
        <div className='col-sm-2 col-12'>
        {/* <label for="label-control">Nationality</label> */}
            <select className="form-control tnation" name="nationality" value={user.nationality} onChange={this.handleChange}>
                <option>Nationality</option>
                <option value = "Indian">Indian</option>
                <option value = "Foreigner">Foreigner</option>
            </select>
        </div>
        <div className='col-sm-2 col-12'>
        {/* <label for="label-control">ID Proof</label> */}
            <select className="form-control tidproof" name="id_proof" value={user.id_proof} onChange={this.handleChange}>
                {user.nationality != 'Foreigner'  && <option value="">ID Proof</option> }
                {user.nationality != 'Foreigner' && <option value = "Aadhar Card">Aadhar Card</option> }
                {user.nationality != 'Foreigner' && <option value = "Voter Id">Voter ID</option> }
                {user.nationality != 'Foreigner' && <option value = "Driving Licence">Driving License</option> }
                <option value="">select</option>
                <option value="Passport">Passport</option>
            </select>
        </div>
        <div className='col-sm-2 col-12'>
        {/* <label for="label-control">ID Number</label> */}
            <input
            className="form-control tidno"
            name="idnumber"
            value={user.idnumber}
            onChange={this.handleChange}
            placeholder="ID Number"
            type="text"
            />
        </div>
      </>
    );
  }
}

export default TravellerInputs;