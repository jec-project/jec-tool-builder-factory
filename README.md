# JEC Builder Factory Project

Builder Factory is an easy-to-use tool to create Joshua Bloch's builder pattern implementations from DTOs.
The JEC Builder Factory Project is a part of the [JEC Project][jec-url].

[![][jec-logo]][jec-url]

## Requirements

JEC Builder Factory needs the following system parameters in order to work correctly:

- Node 6+
- npm 3+
- TypeScript 2+

## Installation

Set up the JEC Builder Factory module with:

```bash
$ npm install jec-tool-builder-factory -g
```

## Usage

To create a new builder for the `form/util/dto/AddressDto` run:

```bash
create-builder --source="form/util/dto/AddressDto" --output="form/util/builder"
```

Then, just use the `AddressDtoBuilder` class method as follow, to easily create new `AddressDto` instances: 

```typescript
import {AddressDto} from "form/util/dto/AddressDtoBuilder";
import {AddressDtoBuilder} from "form/util/builder/AddressDtoBuilder";

const newAddress:AddressDto = AddressDtoBuilder.create()
                                               .address1("my funny street")
                                               .zipCode("00000")
                                               .city("My City")
                                               .country("My Country")
                                               .build();
console.log(newAddress.city); // outputs "My City"
```

## Running Tests

To execute all unit tests, use:

```bash
$ npm test
```

## API Reference

The API Reference documentation is not included into the JEC Builder Factory node module. To build the API reference documentation, use:

```bash
$ grunt doc
```

Documentation will be generated in the `docs/api-reference` repository.
The online version of the  API reference documentation will be available soon at the JEC Website.

The documentation generator is [TypeDoc](http://typedoc.org/)

## Update Release Notes

**Current stable release:** [1.0.0](CHANGELOG.md#jec-tool-builder-factory-1.0.0)
 
For a complete listing of release notes for all JEC Builder Factory update releases, see the [CHANGELOG](CHANGELOG.md) file. 

## License
This JEC Builder Factory Project is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

```
Copyright 2016-2018 Pascal ECHEMANN.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[jec-url]: http://jecproject.org
[jec-logo]: https://raw.githubusercontent.com/jec-project/JEC/master/assets/jec-logos/jec-logo.png