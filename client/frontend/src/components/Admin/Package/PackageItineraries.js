import { Component } from "react";

class PackageItineraries extends Component {
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
        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="title"
            value={user.title}
            onChange={this.handleChange}
            placeholder="Itinerary Title"
            type="text"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            defaultValue={user.description}
            onChange={this.handleChange}
            placeholder="Itinerary Description"
          />
        </td>

      </>
    );
  }
}

export default PackageItineraries;
