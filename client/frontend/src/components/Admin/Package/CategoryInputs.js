import { Component } from "react";

class CategoryInputs extends Component {
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
            name="room_price"
            value={user.room_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="extra_ad_price"
            value={user.extra_ad_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="extra_ch_price"
            value={user.extra_ch_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="fes_room_price"
            value={user.fes_room_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="fes_ad_price"
            value={user.fes_ad_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="fes_ch_price"
            value={user.fes_ch_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="safari_de_price"
            value={user.safari_de_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="safari_we_price"
            value={user.safari_we_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="safari_fes_price"
            value={user.safari_fes_price}
            onChange={this.handleChange}
            type="number"
          />
        </td>

        {/* <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="festival_kid"
            value={user.festival_kid}
            onChange={this.handleChange}
            placeholder="Festival Kid Price"
            type="number"
          />
        </td>

        <td className='border border-slate-300 text-center'>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="festival_price"
            value={user.festival_price}
            onChange={this.handleChange}
            placeholder="Festival Price"
            type="number"
          />
        </td> */}

      </>
    );
  }
}

export default CategoryInputs;
