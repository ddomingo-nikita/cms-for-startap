import type { Schema, Struct } from '@strapi/strapi';

export interface CustomComponentsAddress extends Struct.ComponentSchema {
  collectionName: 'components_custom_components_addresses';
  info: {
    displayName: 'Address';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    number: Schema.Attribute.String;
    street: Schema.Attribute.String;
    zipCode: Schema.Attribute.String;
  };
}

export interface CustomComponentsContactData extends Struct.ComponentSchema {
  collectionName: 'components_custom_components_contact_data';
  info: {
    description: '';
    displayName: 'Contact Details';
  };
  attributes: {
    emailAddress: Schema.Attribute.Email;
    firstName: Schema.Attribute.String;
    lastName: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
  };
}

export interface CustomComponentsOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_custom_components_opening_hours';
  info: {
    description: '';
    displayName: 'openingHours';
  };
  attributes: {
    close: Schema.Attribute.Time & Schema.Attribute.Required;
    day: Schema.Attribute.Enumeration<
      [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
    >;
    open: Schema.Attribute.Time & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'custom-components.address': CustomComponentsAddress;
      'custom-components.contact-data': CustomComponentsContactData;
      'custom-components.opening-hours': CustomComponentsOpeningHours;
    }
  }
}
