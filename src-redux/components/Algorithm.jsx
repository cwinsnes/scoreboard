import React from "react";
import { linkOnClick } from "../utils/utils";
import { Button } from "react-bootstrap";

export const Algorithm = props => {
	let scores = props.data.score_data.data.map((item, idx) => {
		return (
			<div key={"score_" + idx} className="single-score col-sm-2">
				<span className="score-span">{item.toFixed(2)}</span>
			</div>
		);
	});
	let activeClass = props.active ? "algorithm-selected" : "";
	let detailedScores = "";
	let detailedInfo = "";
	if (props.active) {
		detailedScores = props.data.score_data.additionalData.map((item, idx) => {
			let eachDetailedScore = item.map((item2, idx2) => {
				return (
					<div key={"score_" + idx + "_" + idx2} className="single-score col-sm-2">
						<span className="score-span">{item2.toFixed(2)}</span>
					</div>
				);
			});
			return (
				<div key={"detailed_score_" + idx} className="row">
					{eachDetailedScore}
				</div>
			);
		});
		let publications = "";
		if (props.data.publication) {
			const publications_split = props.data.publication.split(",");
			publications = publications_split.map((item, idx) => {
				return (
					<a onClick={linkOnClick} target="_blank" href={item} key={"publication_" + idx}>
						{" "}
						({idx + 1})
					</a>
				);
			});
			publications = (
				<h6 key={`publication_${props.data.name}`}>Publications: {publications}</h6>
			);
		}
		detailedInfo = [
			<h6 key={`submit_date_${props.data.name}`}>
				{props.data.submission_date.slice(0, 10)}
			</h6>,
			publications,
		];
	}
	const unapprovedClass = props.data.is_accepted ? "" : " unapproved";
	const approveButton = props.data.is_accepted ? (
		""
	) : (
		<div className="col-sm-1">
			<Button className="admin-approve" bsSize="xsmall" bsStyle="info">
				Approve
			</Button>
			<Button className="admin-approve" bsSize="xsmall" bsStyle="warning">
				Reject
			</Button>
		</div>
	);
	return (
		<div>
			<div
				data-idx={props.index}
				className={"col-sm-offset-1 col-sm-10 algorithm " + activeClass + unapprovedClass}
				onClick={props.activate}
			>
				<div className="row">
					<div className="col-sm-3">
						<h5 className="algo-name">
							{props.data.name}
							<a onClick={linkOnClick} target="_blank" href={props.data.repository}>
								{" "}
								<i className="glyphicon glyphicon-link" />
							</a>
						</h5>
						<h6 className="gh-name">by {props.data.user_name}</h6>
						{detailedInfo}
					</div>
					<div className="col-sm-9 scores">
						<div className="row">{scores}</div>
						<div className="detailed-scores">{detailedScores}</div>
					</div>
				</div>
			</div>
			{approveButton}
		</div>
	);
};