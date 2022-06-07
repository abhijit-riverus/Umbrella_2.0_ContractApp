export const UPLOADING = 'Uploading';
export const UPLOADED = 'Uploaded';
export const FAILED = 'Failed';
export const PROCESSING = 'Processing';
export const DONE = 'Done';
export const defaultPageSize = 15;

export const reminderFrequencyType: ReminderFrequencyType = {
    'Never': 'never',
    'Everyday': 'every_day',
    'Every Week': 'every_week',
    'Every Month': 'every_month'
}

export const reminderFrequencyTypeKey: ReminderFrequencyType = {
    'never': 'Never',
    'every_day': 'Everyday',
    'every_week': 'Every Week',
    'every_month': 'Every Month'
}

export interface ReminderFrequencyType {
    [key: string]: string;
    // [key1: string]: string;
    // [key2: string]: string;
    // [key3: string]: string;
}

export const DOCUMENT_TYPES: string[] = [
    'Consulting Agreement',
    'Collaboration Agreement',
    'Franchise Agreement',
    'Manufacturing Agreement',
    'Non-Disclosure Agreement',
    'Purchase Agreement',
    'Supply Agreement',
    'Commercial Agreement'
]