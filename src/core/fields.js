var activeFields = {
    "Public"          : [
      {"tag":"Name",          "field": "name"},
      {"tag":"Description",   "field": "description"},
      {"tag":"Tags",          "field": "tags", "type":"Tag"}
  ],
    "Private"         : [
      {"tag":"Phone",         "field": "phone",      "category":"sensitive"},
      {"tag":"Email",         "field": "email",      "category":"sensitive"},
      {"tag":"Job History",   "field": "jobHist",    "category":"hist"},
      {"tag":"Education",     "field": "education",  "category":"education"},
      {"tag":"References",    "field": "references", "category":"ref"}
    ]
  };
export default activeFields;
  
  module.exports = {
    activeFields
  }