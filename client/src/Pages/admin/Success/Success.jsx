import { Button, Result } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetProducts } from "../../../features/CartSlicer";
const Success = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetProducts());
  }, [dispatch]);
  return (
    <div className="success-page">
      <div className="container">
        <Result
          status="success"
          title="Ödeme Başarılı!"
          subTitle="Siparişiniz başarıyla tamamlandı"
          extra={[
            <Link to={"/"} key="home">
              <Button type="primary">Ana Sayfa</Button>,
            </Link>,

            <Button key="buy">Siparişlerim</Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default Success;
