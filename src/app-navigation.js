import { loadMessages, locale, formatMessage } from "devextreme/localization";
import service from "./db/data.js";

const storedLocale = sessionStorage.getItem("locale") || "en";
loadMessages(service.getDictionary());
locale(storedLocale);

export function changeLocale(e) {
  sessionStorage.setItem("locale", e.value);
  document.location.reload();
}

export const navigation = [
  {
    text: formatMessage("Dashboard"),
    path: "/dashboard",
    icon: "aligncenter",
  },
  {
    text: "Scoring PK-312",
    icon: "datatrending",
    path: "",
    items: [
      {
        text: "Company Scoring",
        path: "/tasks",
      },
      {
        text: "Bank Scoring",
        path: "/sign-up-form",
      },
    ],
  },
];
