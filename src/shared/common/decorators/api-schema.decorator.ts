import { ApiSchemaDecorator } from '../types';

export const ApiSchema: ApiSchemaDecorator = ({ name }) => {
  return (constructor) => {
    const wrapper = class extends constructor {};
    Object.defineProperty(wrapper, 'name', {
      value: name,
      writable: false,
    });
    return wrapper;
  };
};
