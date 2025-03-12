import React, { useState } from "react";
import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import UserPanel from "../user-panel/UserPanel";
import "./Header.scss";
import { Template } from "devextreme-react/core/template";
import { ThemeSwitcher } from "../theme-switcher/ThemeSwitcher";
import SelectBox from "devextreme-react/select-box";
import service from "../../db/data";
import deMessages from 'devextreme/localization/messages/de.json';	
import ruMessages from 'devextreme/localization/messages/ru.json';
import { loadMessages } from 'devextreme/localization';
export default function Header({ menuToggleEnabled, title, toggleMenu }) {
  const [locale, setLocale] = useState(
    sessionStorage.getItem("locale") || "en"
  );
  const locales = service.getLocales();
  const changeLocale = (e) => {
    setLocale(e.value);
    sessionStorage.setItem("locale", e.value);
    document.location.reload();
  };
  const selectBoxInputAttr = { id: "selectInput" };
  // locale(sessionStorage.getItem('locale') || 'en');
  loadMessages(deMessages);
  loadMessages(ruMessages);

  return (
    <header className={"header-component"}>
      <Toolbar className={"header-toolbar"}>
        <Item
          visible={menuToggleEnabled}
          location={"before"}
          widget={"dxButton"}
          cssClass={"menu-button"}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location={"before"}
          cssClass={"header-title"}
          text={title}
          visible={!!title}
        />
        <Item location={"after"}>
          <SelectBox
            items={locales}
            valueExpr="Value"
            displayExpr="Name"
            value={locale}
            onValueChanged={changeLocale}
            inputAttr={selectBoxInputAttr}
          />
        </Item>
        <Item location={"after"}>
          <ThemeSwitcher />
        </Item>
        <Item
          location="after"
          locateInMenu="auto"
          menuItemTemplate="userPanelTemplate"
        >
          <UserPanel menuMode="context" />
        </Item>
        <Template name="userPanelTemplate">
          <UserPanel menuMode="list" />
        </Template>
      </Toolbar>
    </header>
  );
}