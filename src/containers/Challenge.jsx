import React from "react";
import { connect } from "react-redux";
import { Tabs } from "../components/Tabs.jsx";
import { About, Datasets } from "../components/ChallengePage.jsx";
import { ChallengeFormTab } from "../components/ChallengeFormTab.jsx";
import { Algorithms } from "./AlgorithmContainer.jsx";
import { config } from "../scoreboard.cfg";

class ChallengeTabsClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "",
			loading: false,
		};
	}

	clickLink(e, data) {
		const activetab = e.target.getAttribute("data-tabname");
		// toggle if the new tab is the same as the old, otherwise switch tabs
		if (activetab === this.state.active) this.setState({ active: "" });
		else this.setState({ active: activetab });
	}

	render() {
		let aboutContent = "";
		let challengeColor = "rgb(110, 180, 255)";
		if (this.props.challengeName) {
			aboutContent = config.challenges[this.props.challengeName.toLowerCase()].about;
			challengeColor = config.challenges[this.props.challengeName.toLowerCase()].color;
		}
		let content = "";
		const dlSize = "83 GB";
		const scoreCategories = ["Score 1", "Score 2", "Score 3", "Score 4", "Score 5", "Score 6"];
		if (this.state.active === "about") {
			content = <About color={challengeColor} content={aboutContent} key="about" />;
		} else if (this.state.active === "datasets") {
			content = (
				<Datasets
					key="dataset"
					color={challengeColor}
					challenge={this.props.challengeName.toLowerCase()}
					datasets={this.props.datasets}
					downloadsize={dlSize}
				/>
			);
		} else if (this.state.active === "submit") {
			content = (
				<ChallengeFormTab
					key="submission"
					color={challengeColor}
					challengeName={this.props.challengeName.toLowerCase()}
				/>
			);
		}
		content = [
			content,
			<Algorithms
				key="algorithms"
				isAdmin={this.props.isAdmin}
				userId={this.props.userId}
				data={this.props.submissions}
				categories={scoreCategories}
			/>,
		];

		return (
			<Tabs
				tabs={["about", "datasets", "submit"]}
				onclick={this.clickLink.bind(this)}
				activetab={this.state.active}
				content={content}
				color={challengeColor}
			/>
		);
	}
}

const mapStateToProps = function(state) {
	const { selectedChallege, user } = state;
	return {
		challengeName: selectedChallege.challenge.name,
		challengeId: selectedChallege.challenge.id,
		userID: user.userId,
	};
};

export const ChallengeTabs = connect(mapStateToProps)(ChallengeTabsClass);
