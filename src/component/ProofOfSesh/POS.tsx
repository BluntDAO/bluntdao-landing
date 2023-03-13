import style from "./POS.module.css";

const POS = () => {
  const items = [
    {
      title: "Roll Up A Blunt",
      description:
        "A current OG Validator (BluntDAO Member) finds people to Proof of Sesh aka “Smoke with”  and rolls up a Blunt. Now any SESH device will do IRL depending on the mint",
      img: "/img/roll-up.png",
    },
    {
      title: "Light Blunt",
      description: "Light the Blunt and hit it (or the sesh device)",
      img: "/img/burn.png",
    },
    {
      title: "Init",
      description:
        "Initialize rotations and pass to prospective members. Once they have hit the Blunt (or Sesh Device) they are now allowed to be given the new BluntDAO member an OG Valiators NFT (if an OG validator was present to witness this)",
      img: "/img/init.png",
    },
    {
      title: "Create Wallet",
      description:
        "During the rotation while the Blunt (or sesh device) is lit, have the new prospective member download a wallet (Solana or NEAR w/ NEAR scan the Blunt DAO code) and have them join the BluntDAO telegram or discord",
      img: "/img/token.png",
    },
    {
      title: "Validation",
      description:
        "Depending on if the new member is on Solana have them send you the address, or on NEAR/Polygon have them scan the link and claim NFT. Once they get the NFT Proof of Sesh is complete",
      img: "/img/validation.png",
    },
    {
      title: "Onboard Others",
      description: `With great Blunts comes great responsibility. As a validator it is your job to explain Proof of Sesh, but also make sure new members are given a proper orientation of all our social medias & existing community, and that they too get credit for onboarding others. Make sure they have their passphrase in a secure way and they are on telegram or discord and follow the BluntDAO twitter`,
      img: "/img/request.png",
    },
  ];

  return (
    <div className={style.container}>
      <div className={`${style.section} section`} id="pos">
        <div className={style.header}>Proof Of Sesh</div>
        <div className={style.subheader}>
          Proof of Sesh is the consensus mechanism for validating new “nodes”
          aka members to BluntDAO. It is how you become an OG Validator in the
          BluntDAO and earn the right to Proof of Sesh prospective members
        </div>

        <div className={style.itemContainer}>
          {items.map((item, idx) => {
            return (
              <div key={item.title} className={style.item}>
                <div className={style.img}>
                  <img src={item.img} alt="" />
                </div>
                <div className={style.heading}>
                  <div className={style.title}>{item.title}</div>
                </div>
                <div className={style.description}>{item.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={style.separateRough}></div>
    </div>
  );
};

export default POS;
