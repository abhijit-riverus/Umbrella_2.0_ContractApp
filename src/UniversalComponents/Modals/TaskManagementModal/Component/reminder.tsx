import * as React from "react";
import { deflateSync } from "zlib";
import { reminderFrequencyType } from "../../../../Constants/const";
import Scrollable from "../../../Scrollable/scrollable";

interface Props {
	insertReminderDuration: (duration: string) => void;
	insertReminderDurationType: (durationType: string) => void;
	insertReminderDurationBeforeAfter: (durationBeforeAfter: string) => void;
	insertReminderRepeatWhen: (repeatFrequency: string) => void;
	insertReminderRepeatUntil: (repeatUntil: string) => void;
	reminderStart: number;
	reminderStartType: string;
	reminderType: string;
	frequencyType: string;
	reminderUntil: string;
	selectedfrequencyType: string;
}

interface State {
	reminderTimeValue: any;
	initialReminderValue: number;
	initialReminderType: string;
	initialReminderReference: string;
	initialReminderRepeat: string;
	hideDurationOptions: boolean;
	hideDurationTypeOptions: boolean;
	hideDurationReferenceOptions: boolean;
	hideRepetitionOptions: boolean;
}

const reminderTypeConst: any = {
	Days: 31,
	Weeks: 52,
	Months: 12,
};

export default class Reminder extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		let rtv: any = [];
		for (let i = 1; i <= reminderTypeConst["Days"]; i++) {
			rtv.push(
				<option key={i} value={i}>
					{i}
				</option>
			);
		}

		this.state = {
			reminderTimeValue: rtv,
			initialReminderValue: 1,
			initialReminderType: "Days",
			initialReminderReference: "Before",
			initialReminderRepeat: "Never",
			hideDurationOptions: true,
			hideDurationTypeOptions: true,
			hideDurationReferenceOptions: true,
			hideRepetitionOptions: true,
		};

		this.updateReminderType = this.updateReminderType.bind(this);
		this.updateReminderDuration = this.updateReminderDuration.bind(this);
		this.updateReminderDurationBeforeAfter =
			this.updateReminderDurationBeforeAfter.bind(this);
		this.updateReminderDurationBeforeAfter =
			this.updateReminderDurationBeforeAfter.bind(this);
		this.updateReminderRepeatWhen =
			this.updateReminderRepeatWhen.bind(this);
	}

	componentWillReceiveProps(nextProps: Props) {}

	updateReminderRepeatWhen(e: any) {
		this.props.insertReminderRepeatWhen(e.target.value);
		this.setState({
			initialReminderRepeat: e.target.value,
		});
	}

	updateReminderDurationBeforeAfter(e: any) {
		this.props.insertReminderDurationBeforeAfter(e.target.value);
		this.setState({
			initialReminderReference: e.target.value,
		});
	}

	updateReminderDuration(e: any) {
		this.props.insertReminderDuration(e.target.value);
		// this.setState({
		//     initialReminderValue: e.target.value
		// })
	}

	updateReminderType(e: any) {
		/*
        this.props.insertReminderDurationType(e.target.value);
        let rtv: any = []
        for (let i = 1; i <= reminderTypeConst[e.target.value]; i++) {
            rtv.push(<option value={i}>{i}</option>);
        }
        this.setState({
            initialReminderType: e.target.value,
            reminderTimeValue: rtv
        })
        */
	}

	componentDidMount() {
		// this.props.insertReminderDuration(this.state.initialReminderValue.toString());
		// this.props.insertReminderDurationType(this.state.initialReminderType);
		// this.props.insertReminderDurationBeforeAfter(this.state.initialReminderReference);
		// this.props.insertReminderRepeatWhen(this.state.initialReminderRepeat);
	}

	render() {
		let {
			insertReminderRepeatUntil,
			reminderStart,
			insertReminderDuration,
			insertReminderDurationType,
			reminderStartType,
			insertReminderDurationBeforeAfter,
			reminderType,
			insertReminderRepeatWhen,
			frequencyType,
			reminderUntil,
			selectedfrequencyType,
		} = this.props;
		let {
			hideDurationOptions,
			hideDurationTypeOptions,
			hideDurationReferenceOptions,
			hideRepetitionOptions,
		} = this.state;

		let rtv: any = [];
		for (let i = 1; i <= reminderTypeConst[reminderStartType]; i++) {
			rtv.push(i);
		}
		const durationOptions = rtv;

		return (
			<>
				<div className="row mb-3" id="reminder-container">
					<div className="col-md-2 mt-1">Remind</div>
					<div className="col-md-2" style={{ paddingLeft: "7px" }}>
						<div
							className="duration"
							id="duration-input"
							onClick={() =>
								this.setState({
									hideDurationOptions: !hideDurationOptions,
								})
							}
						>
							{reminderStart}
							<span
								className="float-right"
								style={{ padding: "0px 6px" }}
							>
								<img
									src="/static_images/tag-dropdown-active.svg"
									alt="dropdown"
								/>
							</span>
						</div>
						<div
							id="duration-options-container"
							className="col-md-12 duration-options"
							style={{ width: "55%" }}
							hidden={hideDurationOptions}
						>
							<Scrollable maxHeight={280} padding={false}>
								{durationOptions.map(
									(duration: number, key: number) => (
										<div
											id="duration-div"
											key={key}
											onClick={(e) =>
												this.setState(
													{
														hideDurationOptions:
															!hideDurationOptions,
													},
													() =>
														insertReminderDuration(
															duration.toString()
														)
												)
											}
											style={{
												wordBreak: "keep-all",
												paddingLeft: "5px",
											}}
										>
											{duration}
										</div>
									)
								)}
							</Scrollable>
						</div>
						{/* <select name="duration" className="duration" style={{ width: '44px' }}
                            onChange={(e) => this.updateReminderDuration(e)}
                            value={reminderStart}>
                            {this.state.reminderTimeValue}
                        </select> */}
					</div>
					<div className="col-md-3 pl-0">
						<div
							className="duration-type"
							id="duration-type-input"
							onClick={() =>
								this.setState({
									hideDurationTypeOptions:
										!hideDurationTypeOptions,
								})
							}
						>
							{reminderStartType}
							<span
								className="float-right"
								style={{ padding: "0px 6px" }}
							>
								<img
									src="/static_images/tag-dropdown-active.svg"
									alt="dropdown"
								/>
							</span>
						</div>
						<div
							id="duration-type-options-container"
							className="duration-type-options"
							style={{ width: "90%" }}
							hidden={hideDurationTypeOptions}
						>
							{Object.keys(reminderTypeConst).map((type, key) => (
								<p
									key={key}
									onClick={(e) =>
										this.setState(
											{
												hideDurationTypeOptions:
													!hideDurationTypeOptions,
											},
											() =>
												insertReminderDurationType(type)
										)
									}
									style={{
										padding: "7px 10px 1px",
										marginBottom: "auto",
									}}
								>
									{type}
								</p>
							))}
						</div>
						{/* <select name="duration-type" className="duration-type"
                            onChange={(e) => this.updateReminderType(e)}
                            value={this.state.initialReminderType}>
                            {Object.keys(reminderType).map(key => <option value={key}>{key}</option>)}
                        </select> */}
					</div>
					<div className="col-md-4">
						<div
							className="duration-reference"
							id="duration-reference-input"
							onClick={() =>
								this.setState({
									hideDurationReferenceOptions:
										!hideDurationReferenceOptions,
								})
							}
						>
							{reminderType}
							<span
								className="float-right"
								style={{ padding: "0px 6px" }}
							>
								<img
									src="/static_images/tag-dropdown-active.svg"
									alt="dropdown"
								/>
							</span>
						</div>
						<div
							id="duration-reference-options-container"
							className="duration-reference-options"
							style={{ width: "100%" }}
							hidden={hideDurationReferenceOptions}
						>
							{["Before", "After"].map((reference, key) => (
								<p
									key={key}
									onClick={(e) =>
										this.setState(
											{
												hideDurationReferenceOptions:
													!hideDurationReferenceOptions,
											},
											() =>
												insertReminderDurationBeforeAfter(
													reference.toLowerCase()
												)
										)
									}
									style={{
										padding: "3px 10px 3px",
										marginBottom: "auto",
									}}
								>
									{reference}
								</p>
							))}
						</div>
						{/* <select name="duration-reference" className="duration-reference"
                            onChange={(e) => this.updateReminderDurationBeforeAfter(e)}
                            value={this.state.initialReminderReference}>
                            <option value="Before" selected>Before</option>
                            <option value="After">After</option>
                        </select> */}
					</div>
				</div>
				<div className="row" id="repeats-container">
					<div
						className="col-md-2 pr-0"
						style={{ marginTop: "0.17rem" }}
					>
						Repeats
					</div>
					<div className="col-md-4" style={{ paddingLeft: "7px" }}>
						<div
							className="repetition"
							id="repetition-input"
							onClick={() =>
								this.setState({
									hideRepetitionOptions:
										!hideRepetitionOptions,
								})
							}
						>
							{selectedfrequencyType}
							<span
								className="float-right"
								style={{ padding: "0px 6px" }}
							>
								<img
									src="/static_images/tag-dropdown-active.svg"
									alt="dropdown"
								/>
							</span>
						</div>
						<div
							id="repetition-options-container"
							className="repetition-options"
							style={{ width: "100%" }}
							hidden={hideRepetitionOptions}
						>
							{Object.keys(reminderFrequencyType).map(
								(repetition, key) => (
									<p
										key={key}
										onClick={(e) =>
											this.setState(
												{
													hideRepetitionOptions:
														!hideRepetitionOptions,
												},
												() =>
													insertReminderRepeatWhen(
														repetition
													)
											)
										}
										style={{
											padding: "3px 10px 3px",
											marginBottom: "auto",
										}}
									>
										{repetition}
									</p>
								)
							)}
						</div>
						{/* <select name="repetition" className="repetition"
                            onChange={(e) => this.updateReminderRepeatWhen(e)}
                            value={this.state.initialReminderRepeat}>
                            <option value="Never">Never</option>
                            <option value="Everyday">Everyday</option>
                            <option value="Every Week">Every Week</option>
                            <option value="Every Month">Every Month</option>
                        </select> */}
					</div>
					<div className="col-md-6">
						<div className="row">
							<div className="col-md-3 pr-0 mt-1">Until</div>
							<div className="col-md-9 pl-0">
								<input
									type="date"
									className="until"
									style={{ width: "165px" }}
									value={reminderUntil}
									onChange={(e) =>
										insertReminderRepeatUntil(
											e.target.value
										)
									}
								></input>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
