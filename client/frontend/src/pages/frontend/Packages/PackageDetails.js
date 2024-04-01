import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PackageBanner from '../../../components/frontend/Package/PackageBanner'
import PackageItems from '../../../components/frontend/Package/PackageItems'
import PackageIternary from '../../../components/frontend/Package/PackageIternary'
import PackagePaymentPolicy from '../../../components/frontend/Package/PackagePaymentPolicy'
import PackagePolicy from '../../../components/frontend/Package/PackagePolicy'
import PackageTermsConditions from '../../../components/frontend/Package/PackageTermsConditions'
import TourDetails from '../../../components/frontend/Package/TourDetails'

export default function PackageDetails() {
  const [packages, setPackages] = useState({});
  const [packageId, setPackageId] = useState('');
  const [packageName, setPackageName] = useState('');
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const getPackage = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/package/packages/slug/${params.id}`);

      setPackages(res.data.data);
      setPackageId(res.data.data.package._id);
      setPackageName(res.data.data.package.name);

    }

    getPackage();

  }, [params.id]);

  return (
    <div className='packageDetails'>
      <PackageBanner packages={packages} />
      <TourDetails packages={packages} />
      <PackageItems packages={packages} />
      <PackageIternary packages={packages} />
      <PackageTermsConditions packages={packages} />
      <PackagePolicy packages={packages} />
      <PackagePaymentPolicy packages={packages} />
    </div>
  )
}
