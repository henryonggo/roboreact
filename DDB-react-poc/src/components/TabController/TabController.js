import React, { Component } from "react";
import "./TabController.scss";

import TabBar from "components/TabController/TabBar/TabBar";
import TabView from "components/TabController/TabView/TabView";

class TabController extends Component {
    render() {
        return (
            <div className="TabController">
                <TabBar/>
                <TabView/>
            </div>
        );
    }
}

export default TabController;