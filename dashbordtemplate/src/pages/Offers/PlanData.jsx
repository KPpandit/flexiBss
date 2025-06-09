export const samplePlans = [
  {
    pack_id: 69,
    pack_name: "Neo 5G Router 150",
    pack_code: "FWA150",
    pack_status: "Approved",
    description: "Router Plan",
    pricing_model: "Fixed",
    pack_price: 150.0,
    validity: 30,
    validity_type: "Days",
    data_balance: 931,
    data_balance_parameter: "GB",
    assigned_data_balance: "931 GB",
    category_name: "FWA",
    base_pack: {
      base_pack_id: 70,
      ofn_sms_charges: "0",
      ofn_call_charges: "0",
      is_fup_enabled: false
    }
  },
  {
    pack_id: 70,
    pack_name: "Postpaid Plus 999",
    pack_code: "POST999",
    pack_status: "Approved",
    description: "Premium Postpaid Plan",
    pricing_model: "Fixed",
    pack_price: 999.0,
    validity: 30,
    validity_type: "Days",
    data_balance: 150,
    data_balance_parameter: "GB",
    assigned_data_balance: "150 GB",
    category_name: "Postpaid",
    base_pack: {
      base_pack_id: 71,
      ofn_sms_charges: "0",
      ofn_call_charges: "0",
      is_fup_enabled: true
    }
  },
  {
    pack_id: 71,
    pack_name: "Prepaid Starter 199",
    pack_code: "PRE199",
    pack_status: "Pending",
    description: "Basic Prepaid Plan",
    pricing_model: "Fixed",
    pack_price: 199.0,
    validity: 28,
    validity_type: "Days",
    data_balance: 2,
    data_balance_parameter: "GB",
    assigned_data_balance: "2 GB",
    category_name: "Prepaid",
    base_pack: {
      base_pack_id: 72,
      ofn_sms_charges: "0",
      ofn_call_charges: "0",
      is_fup_enabled: false
    }
  },
  {
    pack_id: 72,
    pack_name: "Corporate Unlimited",
    pack_code: "CORP9999",
    pack_status: "Rejected",
    description: "Corporate Unlimited Plan",
    pricing_model: "Fixed",
    pack_price: 9999.0,
    validity: 365,
    validity_type: "Days",
    data_balance: 1000,
    data_balance_parameter: "GB",
    assigned_data_balance: "1000 GB",
    category_name: "Corporate",
    base_pack: {
      base_pack_id: 73,
      ofn_sms_charges: "0",
      ofn_call_charges: "0",
      is_fup_enabled: true
    }
  }
];