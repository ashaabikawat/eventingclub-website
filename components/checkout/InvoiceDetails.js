import React, { useEffect, useState } from "react";
import AddAddress from "../common/AddAddress";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ticket } from "@/utils/config";
import toast from "react-hot-toast";
import { reset_state } from "@/store/slices/booking";

const InvoiceDetails = ({ cust_id }) => {
  const [stateIsoCode, setStateIsoCode] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityIsoCode, setCityIsoCode] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [isChecked, setIsChecked] = useState(true);

  const address = JSON.parse(localStorage.getItem("address"));
  console.log(address);
  console.log(address);
  const { id } = useParams();
  const selectedTicket = useSelector(
    (store) => store.booking.bookingData.selectedTickets
  );
  const totalTickets = useSelector(
    (store) => store.booking.bookingData.totalTickets
  );
  const promocodeId = useSelector((store) => store.booking.promocodeId);
  const [formData, setFormData] = useState({
    address: "",
    pincode: "",
  });

  const dispatch = useDispatch();

  const bookTicket = async () => {
    if (!isChecked) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    const payload = {
      customer_id: cust_id,
      event_id: id,
      EventTicket_id: selectedTicket[0]?.Ticket_Id,
      TicketQuantity: totalTickets,

      //Optional Feilds

      customer_Country: "India",
      customer_CountryIsoCode: "IN",
    };
    if (promocodeId) payload.Promocode_id = promocodeId;
    if (formData.address) payload.customer_Address = formData?.address;

    if (formData.pincode) payload.customer_Pincode = formData?.pincode;
    if (address?.stateName) payload.customer_State = String(address?.stateName);

    if (address?.stateIsoCode)
      payload.customer_StateIsoCode = String(address?.stateIsoCode);

    if (address?.cityName) payload.customer_City = address?.cityName;

    console.log(payload);

    try {
      const response = await axios.post(`${ticket.POST_DATA}`, payload);
      console.log(response.data);
      toast.success(response.data.message);
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "https://test.payu.in/_payment");

      Object.keys(response.data.data).forEach((key) => {
        const hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", response.data.data[key]);
        form.appendChild(hiddenField);
      });

      document.body.appendChild(form);
      form.submit();
      // dispatch(reset_state());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className=" w-full mt-4 rounded-lg flex justify-between ">
        <form className="w-full">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border md:text-base text-sm border-gray-400 px-4 py-3 rounded-lg w-[100%] relative placeholder:text-gray-600  mt-4"
          />
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="border md:text-base text-sm border-gray-400 px-4  rounded-lg  relative placeholder:text-gray-600  mt-4"
            />

            <AddAddress
              stateIsoCode={stateIsoCode}
              setStateIsoCode={setStateIsoCode}
              stateName={stateName}
              setStateName={setStateName}
              cityIsoCode={cityIsoCode}
              setCityIsoCode={setCityIsoCode}
              cityName={cityName}
              setCityName={setCityName}
            />
          </div>

          <div className="flex justify-start items-center md:gap-2 gap-4 mt-6">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="md:h-4 md:w-4 w-6 h-6 border border-blue-500"
            />
            <span className="md:text-base text-sm">
              i accept and have read the terms and conditions
            </span>
          </div>

          <button
            type="button"
            onClick={bookTicket}
            className="w-full text-white py-2 rounded-lg bg-blue-900 mt-4 "
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceDetails;
