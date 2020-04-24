import React from 'react';
import './SelectInput.css'

export default class SelectInput extends React.Component {

    getOptionTag(option) {
        return (
            <option value={option.title} key={option.title}>{option.title}</option>
        );
    }

    getOptionTags(options) {
        return options.map((option) => {
            return this.getOptionTag(option);
        });
    }

    getOptions() {
        let options = this.props.options;
        if (this.props.groupBy) {
            return this.getOptgroupTags(options);
        } else {
            return this.getOptionTags(options);
        }
    }

    getOptgroupTags(groups) {
        let optgroups = groups.map(group => {
            let children = this.getOptionTags(group[this.props.groupBy]);
            return (
                <optgroup key={group.id} label={group.title}>
                    {children}
                </optgroup>
            );
        });

        return optgroups;
    }

    render() {
        let options = this.getOptions();
        const {groupBy, ...selectProps} = this.props;
        return (
            <select className='SelectInput' defaultValue={this.props.selected} {...selectProps}>
                {options}
            </select>
        );
    }
};

SelectInput.getDefaultProps = {
    options: [],
    groupBy: null,
    selected: null,
};

