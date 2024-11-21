import SelectedCard from "./SelectedCard";

type Selected = {
  name: string;
  type: string;
};

type SelectedCardListProps = {
  selected: Selected[];
};

const SelectedCardList: React.FC<SelectedCardListProps> = ({ selected }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {selected.map((selec, index) => (
        <SelectedCard key={index} name={selec.name} type={selec.type} />
      ))}
    </div>
  );
};

export default SelectedCardList;
