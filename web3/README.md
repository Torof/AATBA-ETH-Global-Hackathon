# Contracts structure

- UserFactory
=> UserAccount

- SubProfileFactory
=> SubProfileTemplateRegistry
=> SubProfileNFT
=> SubProfileTBA

UserAccountFactory is where a user can create its AATBA account. First connect with wallet, then create a UserAccount

SubProfileFactory is where SubProfileTemplates are created by AATBA.
Users can use their UserAccount to create their very own SubProfile from a SubProfileTemplate.
This SubProfile is a NFT of one of the templates, link with it's very own TBA.
The SubProfileTBA can receive SBT that we call Badges.

## Deployment and use

- The **ERC6551Registry** used should be the official Registry deployed on the available chains. see https://docs.tokenbound.org/contracts/deployments-v2.

- The **SubProfileTBA** implementation should be deployed first.

- The **SubProfileFactory** should then be deployed. It takes the ERC6551 (TBA) Registry and the SubProfileTBA implementation address as arguments.
Upon deployment it will deploy a unique SubProfileTemplateRegistry that will store the addresses of the SubProfile NFT collections.

*SubProfileTemplates* (an ERC721 collection of SBT tokens) are generated and registered in the SubProfileTemplateRegistry by calling `generateSubProfileTemplate(string memory name, string memory symbol)` which takes as arguments the name and the symbol of the ERC721 collection that will hold the NFTs that user will mint to own and bind their very own SubProfileTBA account.
This SubProfileTBA account can receive and own the Badges , which are Soul Bound Tokens from verified and registered ERC721 or ERC1155 collections.

- The UserAccount should then be deployed taking as argument the **SubProfileFactory** address previously deployed.

- A user can connect its wallet to then create its unique AATBA account by calling `createUserAccount()` from the **UserAccountFactory**
This AATBA account will hold the different SubProfiles of a user, than will in turn hold the verified SBT Badges of this SubProfile category (Work, Hackathon, Events, Diplomas...)

- Once a user has created its account, it can now create its subProfiles from the available templates in SubProfileTemplateRegistry.

**Once a subProfile is created the user can now receive in their subProfile the SBT badges from verified collections.**


