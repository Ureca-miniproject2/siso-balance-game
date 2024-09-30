import useSelectItem from '../../hooks/queries/useSelectItem';
import calculatePercent from '../../utils/calculatePercent';
import * as S from './Choice.styled';

export default function Choice(props) {
  const { game } = props;
  console.log(game?.firstItem.item_id);
  const { mutate: selectItemMutate } = useSelectItem(game?.firstItem.game_id);
  const isColored = (firstItemSelected, secondItemSelected) => {
    return !firstItemSelected && !secondItemSelected ? true : firstItemSelected ? true : false;
  };

  return (
    <S.ItemContainer>
      <S.ItemList
        onClick={() => selectItemMutate(game?.firstItem?.item_id)}
        iscolored={isColored(game?.firstItem.isSelected, game?.secondItem.isSelected)}
      >
        <S.itemText>{game?.firstItem.item_text}</S.itemText>
        <S.percentBox
          first
          percent={calculatePercent(
            game?.firstItem.selected_count,
            game?.firstItem.selected_count + game?.secondItem.selected_count,
          )}
          isselected={game?.firstItem.isSelected}
          isshow={game?.firstItem.isSelected || game?.secondItem.isSelected}
        />
      </S.ItemList>
      <S.ItemList2
        onClick={() => selectItemMutate(game?.secondItem?.item_id)}
        iscolored={isColored(game?.secondItem.isSelected, game?.firstItem.isSelected)}
      >
        <S.itemText>{game?.secondItem.item_text}</S.itemText>
        <S.percentBox
          percent={calculatePercent(
            game?.secondItem.selected_count,
            game?.firstItem.selected_count + game?.secondItem.selected_count,
          )}
          isselected={game?.secondItem.isSelected}
          isshow={game?.firstItem.isSelected || game?.secondItem.isSelected}
        />
      </S.ItemList2>
    </S.ItemContainer>
  );
}
