import http from 'k6/http';
import encoding from 'k6/encoding';
import { sleep } from 'k6';
import { SharedArray } from "k6/data";

const images = new SharedArray("images", function() { return JSON.parse(open('/Users/caijones/repos/data.json')).images; });
export let options = {
  vus: 50,
  duration: '5m',
};

export default function () {
    const encodedCredentials = encoding.b64encode(`${__ENV.CREDS}`);
    const options = {
        headers: {
            Authorization: `Basic ${encodedCredentials}`,
        },
    };
    let url = 'https://' + `${__ENV.ARTURL}` + '/' + images[0].name + '/manifests/' + images[0].tag;
    let manifest_response = http.request('GET', url, '', options);
    let layers = manifest_response.json().fsLayers;
    for (let i in layers) {
        let digest = layers[i].blobSum;
        let digest_response = http.request('GET', 'https://' + `${__ENV.ARTURL}` + '/' + images[0].name + '/blobs/' + digest, '', options);
    }
    sleep(1);
}
