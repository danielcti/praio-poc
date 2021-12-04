import "intl";
import "intl/locale-data/jsonp/pt-BR";

export const formatMoney = (money: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(money);
};
