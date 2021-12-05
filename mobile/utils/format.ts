import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { OrderStatus } from "../types/Order";

export const formatMoney = (money: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(money);
};

export const getFormattedStatusName = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.canceled:
      return "Cancelado";
    case OrderStatus.finished:
      return "Finalizado";
    case OrderStatus.ongoing:
      return "Em andamento";
    case OrderStatus.open:
      return "Aberto";
    default:
      return "-";
  }
};

export const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case OrderStatus.canceled:
      return "#C63A31";
    case OrderStatus.finished:
      return "#168F13";
    case OrderStatus.ongoing:
      return "#EDBB0C";
    case OrderStatus.open:
      return "#2550A3";
    default:
      return "-";
  }
};
