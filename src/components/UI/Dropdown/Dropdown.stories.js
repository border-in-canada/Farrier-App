import React from 'react';
import { withKnobs, text, radios, select } from "@storybook/addon-knobs";
import Dropdown from './Dropdown';

export default {
    component: Dropdown,
    title: 'Dropdown',
    decorators: [withKnobs],
    excludeStories: /.*Data$/,
};

const selectOptions = [
{value: 'value 1', label: 'Value 1'},
{value: 'value 2', label: 'Value 2'},
{value: 'value 3', label: 'Value 3'},
{value: 'value 4', label: 'Value 4'},
{value: 'value 3', label: 'Value 5'},
{value: 'value 3', label: 'Value 6'},
{value: 'value 3', label: 'Value 7'},
{value: 'value 3', label: 'Value 8'},
{value: 'value 3', label: 'Value 9'},
{value: 'value 3', label: 'Value 10'}
]

const label = 'Message Type';
const options = {
  Error: 'Error',
  Success: 'Success',
  Link: 'Link',
};
const defaultValue = 'Error';

export const dropdownData = {
    id: 'dropdown',
    placeholder: 'Placeholder',
    label: 'Label',
    disabled: false,
    searchable: false,
    options: [
        {value: 'value 1', label: 'Value 1'},
        {value: 'value 2', label: 'Value 2'},
        {value: 'value 3', label: 'Value 3'},
        {value: 'value 4', label: 'Value 4'},
        {value: 'value 3', label: 'Value 5'},
        {value: 'value 3', label: 'Value 6'},
        {value: 'value 3', label: 'Value 7'},
        {value: 'value 3', label: 'Value 8'},
        {value: 'value 3', label: 'Value 9'},
        {value: 'value 3', label: 'Value 10'}
      ],
    value: '',
    msgValue: '',
    msgType: '',
    focus: '',
    blur: '',
    changed: ''
}

export const Default = () => <Dropdown config={{...dropdownData}} />

export const Filled = () => <Dropdown config={{...dropdownData, value: select('Options', selectOptions, '')}} />

export const Disabled = () => <Dropdown config={{...dropdownData, disabled: true}} />

export const withMessage = () => <Dropdown config={{...dropdownData, msgValue: text("Message Value", "-Message Details-"), msgType: radios(label, options, defaultValue)}} />

