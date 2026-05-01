import * as React from "react";
import styles from "./SignatureGenerator.module.scss";
import type { ISignatureGeneratorProps } from "./ISignatureGeneratorProps";
import ringAsset from "../assets/Ring.png";
import phoneAsset from "../assets/Phone32.png";
import cellAsset from "../assets/Cell32.png";
import canadaAsset from "../assets/Canada.png";

interface IFormState {
  name: string;
  certification: string;
  pronounEn: string;
  pronounFr: string;
  deviceName: string;
  deviceNum: string;
  ext: string;
  cell: string;
  email: string;
  roleEn: string;
  roleFr: string;
  displayOrder: boolean;
}

const INITIAL_STATE: IFormState = {
  name: "John Smith",
  certification: "BA, MSC, etc",
  pronounEn: "he/him, she/her, they/them, etc.",
  pronounFr: "il, elle, iel, etc.",
  deviceName: "",
  deviceNum: "",
  ext: "5555",
  cell: "613-123-1234",
  email: "john.smith@ncc-ccn.ca",
  roleEn: "Job Title",
  roleFr: "Titre du poste",
  displayOrder: false,
};

const SignatureGenerator: React.FC<ISignatureGeneratorProps> = (props) => {
  const [formData, setFormData] = React.useState<IFormState>(INITIAL_STATE);
  const [copied, setCopied] = React.useState<boolean>(false);
  const signatureRef = React.useRef<HTMLTableElement | null>(null);
  const copyTimeoutRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => {
    if (props.initialData) {
      setFormData((prev) => ({ ...prev, ...props.initialData }));
    }
  }, [props.initialData]);

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const updateField = <K extends keyof IFormState>(
    field: K,
    value: IFormState[K],
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopy = async (): Promise<void> => {
    if (!signatureRef.current) {
      return;
    }

    const html = signatureRef.current.outerHTML;
    const plainText = signatureRef.current.textContent || "";

    try {
      if (
        navigator.clipboard &&
        typeof (window as Window & { ClipboardItem?: typeof ClipboardItem })
          .ClipboardItem !== "undefined"
      ) {
        const ClipboardItemCtor = (
          window as Window & { ClipboardItem: typeof ClipboardItem }
        ).ClipboardItem;
        const item = new ClipboardItemCtor({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([plainText], { type: "text/plain" }),
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(html);
      }

      setCopied(true);
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 7000);
    } catch {
      setCopied(false);
    }
  };

  const showPronouns =
    !!formData.pronounEn.trim() || !!formData.pronounFr.trim();
  const showExt = !!formData.ext.trim();
  const showCell = !!formData.cell.trim();
  const showDevice =
    !!formData.deviceName.trim() || !!formData.deviceNum.trim();

  return (
    <section
      className={`${styles.signatureGenerator} ${props.className || ""}`}
    >
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h2 className={styles.title}>Instructions</h2>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <ol className={styles.instruction}>
              <li>
                Fill in the fields below. (Your information updates
                automatically below)
              </li>
              <li>Determine your language of preference.</li>
              <li>Click the copy signature box at the bottom.</li>
              <li>Paste into the signature box in your Outlook.</li>
            </ol>
          </div>
          <div className={styles.col}>
            <ol className={styles.instruction}>
              <li>
                Remplissez les champs ci-dessous. (Vos renseignements se
                mettent automatiquement à jour ci-dessous)
              </li>
              <li>Choisissez votre langue de préférence.</li>
              <li>Cliquez sur le bouton pour copier la signature.</li>
              <li>
                Collez le tout dans la fenêtre d&apos;Outlook pour les
                signatures.
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <p>
              <label htmlFor="name">Name / Nom</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="pronounEn">Pronoun(s) - English</label>
              <input
                id="pronounEn"
                type="text"
                value={formData.pronounEn}
                onChange={(e) => updateField("pronounEn", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="roleEn">Role - English</label>
              <input
                id="roleEn"
                type="text"
                value={formData.roleEn}
                onChange={(e) => updateField("roleEn", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="ext">Extension / Poste</label>
              <input
                id="ext"
                type="text"
                value={formData.ext}
                onChange={(e) => updateField("ext", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="cell">Cell / Cellulaire</label>
              <input
                id="cell"
                type="text"
                value={formData.cell}
                onChange={(e) => updateField("cell", e.target.value)}
              />
            </p>
          </div>
          <div className={styles.col}>
            <p>
              <label htmlFor="certification">
                Certification / Accréditation
              </label>
              <input
                id="certification"
                type="text"
                value={formData.certification}
                onChange={(e) => updateField("certification", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="pronounFr">Pronom(s) - Français</label>
              <input
                id="pronounFr"
                type="text"
                value={formData.pronounFr}
                onChange={(e) => updateField("pronounFr", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="roleFr">Rôle - Français</label>
              <input
                id="roleFr"
                type="text"
                value={formData.roleFr}
                onChange={(e) => updateField("roleFr", e.target.value)}
              />
            </p>
            <p>
              <label htmlFor="email">Email / Courriel</label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <p>
              <label htmlFor="deviceName">
                Other device - Name / Autre appareil - Nom
              </label>
              <input
                id="deviceName"
                type="text"
                value={formData.deviceName}
                onChange={(e) => updateField("deviceName", e.target.value)}
              />
            </p>
          </div>
          <div className={styles.col}>
            <p>
              <label htmlFor="deviceNum">
                Other device - Number / Autre appareil - Numéro
              </label>
              <input
                id="deviceNum"
                type="text"
                value={formData.deviceNum}
                onChange={(e) => updateField("deviceNum", e.target.value)}
              />
            </p>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <p className={styles.checkboxRow}>
              <label htmlFor="displayOrder">
                Display Order / Ordre d&apos;affichage
              </label>
              <input
                id="displayOrder"
                type="checkbox"
                checked={formData.displayOrder}
                onChange={(e) => updateField("displayOrder", e.target.checked)}
              />
              <span> Français en premier</span>
            </p>
          </div>
        </div>
      </form>

      <div className={styles.preview}>
        <table
          ref={signatureRef}
          id="sig"
          cellSpacing={0}
          cellPadding={0}
          style={{ padding: "20px 0" }}
        >
          <tbody>
            <tr style={{ verticalAlign: "top" }}>
              <td style={{ paddingRight: "15px", verticalAlign: "top" }}>
                <img
                  src={ringAsset}
                  style={{ verticalAlign: "top" }}
                  width={70}
                  height={70}
                  alt=""
                />
              </td>
              <td>
                <table
                  cellSpacing={0}
                  cellPadding={0}
                  style={{
                    fontFamily:
                      "TimesNewRoman, 'Times New Roman', Times, serif",
                    fontSize: "13px",
                    color: "rgb(0,59,76)",
                    lineHeight: 1.25,
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          fontFamily: "Helvetica, Arial, sans-serif",
                          fontSize: "17px",
                          fontWeight: 700,
                          padding: "5px 0",
                          letterSpacing: ".5px",
                        }}
                      >
                        {formData.name}{" "}
                        {!!formData.certification.trim() && (
                          <span
                            style={{
                              fontFamily: "Times New Roman",
                              fontSize: "14px",
                              fontWeight: 400,
                            }}
                          >
                            {formData.certification}
                          </span>
                        )}
                      </td>
                    </tr>
                    {showPronouns && (
                      <tr>
                        <td>
                          {formData.displayOrder
                            ? `Pronom(s): ${formData.pronounFr} Pronoun(s): ${formData.pronounEn}`
                            : `Pronoun(s): ${formData.pronounEn} Pronom(s): ${formData.pronounFr}`}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>
                        {formData.displayOrder ? (
                          <>
                            {formData.roleFr}
                            <br />
                            {formData.roleEn}
                          </>
                        ) : (
                          <>
                            {formData.roleEn}
                            <br />
                            {formData.roleFr}
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: "5px" }}>
                        <a
                          href={`mailto:${formData.email}`}
                          style={{
                            color: "rgb(0,59,76)",
                            textDecoration: "none",
                          }}
                        >
                          {formData.email}
                        </a>
                      </td>
                    </tr>
                    {showExt && (
                      <tr>
                        <td style={{ verticalAlign: "middle" }}>
                          <img
                            src={phoneAsset}
                            alt=""
                            style={{ verticalAlign: "middle" }}
                            width={14}
                            height={14}
                          />{" "}
                          <span>613-239-5678, ext. / poste </span>
                          <span>{formData.ext}</span>
                        </td>
                      </tr>
                    )}
                    {showCell && (
                      <tr>
                        <td style={{ verticalAlign: "middle" }}>
                          <img
                            src={cellAsset}
                            alt=""
                            style={{ verticalAlign: "middle" }}
                            width={14}
                            height={14}
                          />{" "}
                          <span>{formData.cell}</span>
                        </td>
                      </tr>
                    )}
                    {showDevice && (
                      <tr>
                        <td style={{ verticalAlign: "middle" }}>
                          <img
                            src={phoneAsset}
                            alt=""
                            style={{ verticalAlign: "middle" }}
                            width={14}
                            height={14}
                          />{" "}
                          {formData.deviceName} {formData.deviceNum}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td style={{ padding: "5px 0" }}>
                        <hr style={{ color: "rgb(168,159,136)" }} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {formData.displayOrder ? (
                          <>
                            <a
                              href="http://www.ccn-ncc.gc.ca/"
                              style={{
                                color: "rgb(0,59,76)",
                                textDecoration: "none",
                              }}
                            >
                              Commission de la capitale nationale
                            </a>
                            <br />
                            <a
                              href="http://www.ncc-ccn.gc.ca/"
                              style={{
                                color: "rgb(0,59,76)",
                                textDecoration: "none",
                              }}
                            >
                              National Capital Commission
                            </a>
                          </>
                        ) : (
                          <>
                            <a
                              href="http://www.ncc-ccn.gc.ca/"
                              style={{
                                color: "rgb(0,59,76)",
                                textDecoration: "none",
                              }}
                            >
                              National Capital Commission
                            </a>
                            <br />
                            <a
                              href="http://www.ccn-ncc.gc.ca/"
                              style={{
                                color: "rgb(0,59,76)",
                                textDecoration: "none",
                              }}
                            >
                              Commission de la capitale nationale
                            </a>
                          </>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: "10px" }}>
                        <img src={canadaAsset} width={70} height={17} alt="" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.action}>
        <p
          className={`${styles.success} ${copied ? styles.successVisible : ""}`}
        >
          Your signature has been copied to the clipboard.
          <br />
          Votre signature a été copiée dans le presse-papiers.
        </p>
        <p className={styles.nomargin}>
          <button
            type="button"
            className={styles.copybutton}
            onClick={handleCopy}
          >
            Copy signature / Copier la signature
          </button>
        </p>
      </div>
    </section>
  );
};

export default SignatureGenerator;
