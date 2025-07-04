import TooltipTable from "../../components/TooltipTable";

export default function CallFor102ServiceDetailMenu() {
  const data = [
    {
      key: "Assault Victim",
      value: 22
    },
    {
      key: "Bite Patient",
      value: 5
    },
    {
      key: "Burn Patient",
      value: 27
    },
    {
      key: "Cardiac Patient",
      value: 37
    },
  ];

  const title = "Calls for 102 Service";
  return (
    <TooltipTable data={data} title={title} />
  );
};