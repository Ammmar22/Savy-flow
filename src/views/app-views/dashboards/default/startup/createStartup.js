import React from 'react';
import { Form, Input, Button, Tabs, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useCreateStartupMutation } from '../../../../../store/api/useStartup'; // Assurez-vous que le hook existe
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from 'configs/AppConfig'; // Ajustez le chemin si nécessaire

const { TabPane } = Tabs;

const CreateStartup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [createStartup] = useCreateStartupMutation(); // Remplacez par votre hook de création

  const onFinish = async (values) => {
    const formattedValues = {
      companyDetails: {
        companyName: values.companyName,
        legalCompanyName: values.legalCompanyName,
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        country: values.country,
        companyNumber: values.companyNumber,
        vatNumber: values.vatNumber,
        amlRegistration: values.amlRegistration,
        agentCode : values.agentCode,
        phone: values.phone,
        mobile: values.mobile,
        website: values.website,
        contactMail: values.contactMail,
        supportMail: values.supportMail,
        welcomeMail: values.welcomeMail,
        noreplyMail: values.noreplyMail,
        slogan: values.slogan,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
      },
      socialNetwork: {
        Facebook: values.Facebook,
        Instagram: values.Instagram,
        Linkedin: values.Linkedin,
        Youtube: values.Youtube,
        Tiktok: values.Tiktok,
        AndroidApp: values.AndroidApp,
        AppleApp: values.AppleApp,
        WhatsApp: values.WhatsApp,
        Newsletter: values.Newsletter,
      },
      legalDocs: {
        CookiesText: values.CookiesText,
        Copyright: values.Copyright,
        PrivacyPolicy: values.PrivacyPolicy,
        TermsAndConditions: values.TermsAndConditions,
      },
      logoDesign: {
        logos: values.logos, // Logo peut aussi être un sous-objet
      },
    };

    try {
      const response = await createStartup(formattedValues).unwrap(); // Utilisez la méthode de création
      console.log('API response:', response);
      navigate(`${APP_PREFIX_PATH}/dashboards/default`);
    } catch (error) {
      console.error('Failed to create startup:', error);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Tabs defaultActiveKey="1">
        {/* Ajoutez ici les Form.Item comme dans le composant EditStartup */}
        {/* Le contenu reste globalement le même */}
        <TabPane tab="Company Details" key="1">
        <Form.Item label="Company Name" name="companyName" >
            <Input />
          </Form.Item>
          <Form.Item label="Legal Company Name" name="legalCompanyName">
            <Input />
          </Form.Item>
          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Zip Code" name="zipCode">
            <Input />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input />
          </Form.Item>
          <Form.Item label="Company Number" name="companyNumber">
            <Input />
          </Form.Item>
          <Form.Item label="VAT Number" name="vatNumber">
            <Input />
          </Form.Item>
          <Form.Item label="AML Registration" name="amlRegistration">
            <Input />
          </Form.Item>
          <Form.Item label="Agent Code" name="agentCode">
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile">
            <Input />
          </Form.Item>
          <Form.Item label="Website" name="website" >
            <Input />
          </Form.Item>
          <Form.Item label="Contact Email" name="contactMail">
            <Input />
          </Form.Item>
          <Form.Item label="Support Email" name="supportMail">
            <Input />
          </Form.Item> 
          <Form.Item label="Welcome Email" name="welcomeMail">
            <Input />
          </Form.Item>
          <Form.Item label="No-reply Email" name="noreplyMail">
            <Input />
          </Form.Item>
          <Form.Item label="Slogan" name="slogan">
            <Input />
          </Form.Item>
          <Form.Item label="Short Description" name="shortDescription">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Long Description" name="longDescription">
            <Input.TextArea />
          </Form.Item>
        </TabPane>
        
        <TabPane tab="Social Networks" key="2">
        <Form.Item label="Facebook" name="Facebook">
            <Input />
          </Form.Item>
          <Form.Item label="Instagram" name="Instagram">
            <Input />
          </Form.Item>
          <Form.Item label="LinkedIn" name="Linkedin">
            <Input />
          </Form.Item>
          <Form.Item label="YouTube" name="Youtube">
            <Input />
          </Form.Item>
          <Form.Item label="TikTok" name="Tiktok">
            <Input />
          </Form.Item>
          <Form.Item label="Android App" name="AndroidApp">
            <Input />
          </Form.Item>
          <Form.Item label="Apple App" name="AppleApp">
            <Input />
          </Form.Item>
          <Form.Item label="WhatsApp" name="WhatsApp">
            <Input />
          </Form.Item>
          <Form.Item label="Newsletter" name="Newsletter">
            <Input />
          </Form.Item>
        </TabPane>

        <TabPane tab="Legal Documents" key="3">
          <Form.Item label="Cookies Policy" name="CookiesText">
                <Input />
          </Form.Item>
          <Form.Item label="Copyright" name="Copyright">
                <Input />
          </Form.Item>
          <Form.Item label="Privacy Policy" name="PrivacyPolicy">
                <Input />
          </Form.Item>
          <Form.Item label="Terms and Conditions" name="TermsAndConditions">
                <Input />
          </Form.Item>        
        </TabPane>

        <TabPane tab="Logo" key="4">
                <Form.List name="logos">
                  {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                      <div key={key} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <Form.Item
                    {...restField}
                    name={[name, 'type']}
                    label="Type de logo"
                    rules={[{ required: true, message: 'Veuillez sélectionner un type' }]}
                  >
                    <Select placeholder="Sélectionnez un type">
                      <Select.Option value="Logo EPS">Logo EPS</Select.Option>
                      <Select.Option value="Logo AI">Logo AI</Select.Option>
                      <Select.Option value="Logo PSD">Logo PSD</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'colors']}
                    label="Couleurs"
                  >
                    <Input placeholder="Ex: Bleu, Rouge" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'size']}
                    label="Taille"
                  >
                    <Input placeholder="Ex: 200x200px" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'link']}
                    label="Lien"
                    rules={[{ type: 'url', message: 'Veuillez entrer un lien valide' }]}
                  >
                    <Input placeholder="URL du logo" />
                  </Form.Item>

                  <Button type="dashed" onClick={() => remove(name)} danger>
                    Supprimer
                  </Button>
                </div>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                Ajouter un logo
              </Button>
            </>
          )}
        </Form.List>
      </TabPane>

      </Tabs>

      <Button type="primary" htmlType="submit">
        Create Startup
      </Button>
    </Form>
  );
};

export default CreateStartup;
