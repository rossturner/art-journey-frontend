#!/usr/bin/env python3
import os
import sys
import argparse
import requests

# Hard-coded JSON data
DATA = {
           "data": {
               "id": 256622,
               "publicTitle": "Coloring Foundations: A Complete Guide for Self-Taught Artists",
               "publicNotice": "",
               "publicClassDescription": "",
               "publicTeacherDescription": "",
               "qualification": "Basic,Advanced",
               "assets": [
                   {
                       "id": 823077,
                       "courseId": 256622,
                       "name": "Important Notice_Class Content Usage Guide (Please Read).pdf",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141725-1998/important-notice-class-content-usage-guide--please-read-.pdf"
                   },
                   {
                       "id": 823078,
                       "courseId": 256622,
                       "name": "[Coloso Global] Click for a SPECIAL COUPON.pdf",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141734-1998/-coloso-global--click-for-a-special-coupon.pdf"
                   },
                   {
                       "id": 823079,
                       "courseId": 256622,
                       "name": "c01_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141835-1998/c01-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823080,
                       "courseId": 256622,
                       "name": "c02_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141848-1998/c02-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823081,
                       "courseId": 256622,
                       "name": "c03_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141909-1998/c03-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823082,
                       "courseId": 256622,
                       "name": "c04_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141922-1998/c04-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823083,
                       "courseId": 256622,
                       "name": "c05_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141929-1998/c05-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823085,
                       "courseId": 256622,
                       "name": "c06_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142007-1998/c06-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823084,
                       "courseId": 256622,
                       "name": "c07_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/141953-1998/c07-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823086,
                       "courseId": 256622,
                       "name": "c08_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142016-1998/c08-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823087,
                       "courseId": 256622,
                       "name": "c09_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142045-1998/c09-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823088,
                       "courseId": 256622,
                       "name": "c10_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142116-1998/c10-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823089,
                       "courseId": 256622,
                       "name": "c11_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142151-1998/c11-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823090,
                       "courseId": 256622,
                       "name": "c12_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142203-1998/c12-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823091,
                       "courseId": 256622,
                       "name": "c13_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142226-1998/c13-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823092,
                       "courseId": 256622,
                       "name": "c14_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142247-1998/c14-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823093,
                       "courseId": 256622,
                       "name": "c15_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142314-1998/c15-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823094,
                       "courseId": 256622,
                       "name": "c16_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142325-1998/c16-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823095,
                       "courseId": 256622,
                       "name": "c17_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142353-1998/c17-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823096,
                       "courseId": 256622,
                       "name": "c18_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142401-1998/c18-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823097,
                       "courseId": 256622,
                       "name": "c19_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142412-1998/c19-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823098,
                       "courseId": 256622,
                       "name": "c20_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142425-1998/c20-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823099,
                       "courseId": 256622,
                       "name": "c21-24_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142501-1998/c21-24-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823100,
                       "courseId": 256622,
                       "name": "c25_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142523-1998/c25-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823101,
                       "courseId": 256622,
                       "name": "c26_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142534-1998/c26-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823102,
                       "courseId": 256622,
                       "name": "c27_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142552-1998/c27-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823103,
                       "courseId": 256622,
                       "name": "c28_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142601-1998/c28-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823104,
                       "courseId": 256622,
                       "name": "c29_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142611-1998/c29-illustrator-ttosom-class-material.zip"
                   },
                   {
                       "id": 823105,
                       "courseId": 256622,
                       "name": "c30_Illustrator_Ttosom_Class Material.zip",
                       "url": "https://cdn.day1company.io/prod/uploads/202512/142622-1998/c30-illustrator-ttosom-class-material.zip"
                   }
               ]
           }
       }

def download_assets(dest_dir):
    assets = DATA["data"].get("assets", [])
    if not assets:
        print("No assets to download.")
        return
    for asset in assets:
        asset_url = asset.get("url")
        filename = asset.get("name") or os.path.basename(asset_url)
        path = os.path.join(dest_dir, filename)
        try:
            with requests.get(asset_url, stream=True) as resp:
                resp.raise_for_status()
                with open(path, "wb") as f:
                    for chunk in resp.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
            print(f"Downloaded {filename}")
        except Exception as e:
            print(f"Failed to download {asset_url}: {e}")

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument(
        "-d", "--dest",
        default=None,
        help="Destination directory (defaults to script location)"
    )
    args = p.parse_args()
    base = args.dest or os.path.dirname(os.path.abspath(__file__))
    os.makedirs(base, exist_ok=True)
    download_assets(base)
